import { Component, OnInit } from '@angular/core';
// import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  total: any = 0;
  success: boolean = false;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getTotalCartPrices();
  }
  minusAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getTotalCartPrices();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getTotalCartPrices();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  detectChange() {
    this.getTotalCartPrices();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  getTotalCartPrices() {
    this.total = 0;
    this.cartProducts.map((item: any) => {
      this.total += item.product.price * item.quantity;
    });
  }
  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.getTotalCartPrices();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  clearCart() {
    this.cartProducts = [];
    this.getTotalCartPrices();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  addCart() {
    let products = this.cartProducts.map((item) => {
      return {
        productId: item.product.id,
        quantity: item.quantity,
      };
    });
    let Model = {
      userId: 5,
      date: new Date(),
      products: products,
    };
    this.cartService.addNewCart(Model).subscribe((res) => {
      this.success = true;
    });
    console.log(Model);
  }
}
