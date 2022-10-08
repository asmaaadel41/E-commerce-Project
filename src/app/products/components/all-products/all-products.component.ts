import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true;
    this.productsService.getAllProducts().subscribe({
      next: (res: any) => {
        this.loading = false;
        this.products = res;
      },
      error: (err) => {
        this.loading = false;
        console.log(err.message);
      },
    });
  }
  getCategories() {
    this.loading = true;
    this.productsService.getAllCategories().subscribe({
      next: (res: any) => {
        this.loading = false;
        this.categories = res;
      },
      error: (err) => {
        this.loading = false;
        console.log(err.message);
      },
    });
  }
  filterProductByCat(event: any) {
    let value = event.target.value;
    value === 'All' ? this.getProducts() : this.getProductByCat(value);
  }

  getProductByCat(category: string) {
    this.loading = true;
    this.productsService.getProductByCat(category).subscribe((res: any) => {
      this.loading = false;
      this.products = res;
    });
  }
  addToCart(event: any) {
    // console.log(event);
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(
        (item) => item.product.id === event.product.id
      );
      if (exist) {
        alert('this item is already exist in your cart');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
