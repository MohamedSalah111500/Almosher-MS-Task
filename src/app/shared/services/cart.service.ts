import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Product } from 'src/app/core/models/models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Product[] = [];
  private cart = [];
  cartItemCount = new BehaviorSubject(0);
  totalCount = new BehaviorSubject(0);
  Subscription = new Subscription();

  constructor() {}

  getProducts() {
    return this.products;
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  async resitCarCounter() {
    this.cart = [];
    await this.cartItemCount.next(0);
  }

  intiCarCounter(count) {
    this.cartItemCount.next(this.cartItemCount.value + count);
  }

  getTotalCartPrice(products: Product[]) {
    let totalCount = 0;
    products.map((product) => {
      totalCount = totalCount + product.price * product.count;
    });
    this.totalCount.next(totalCount);
    return totalCount;
  }

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        this.cart = this.cart.filter((prod) => prod.id != product.id);
        this.cart.push(product);
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
      this.cartItemCount.next(this.cartItemCount.value + 1);

      added = false;
    }
    this.getTotalCartPrice(this.cart);
    console.log(this.cart);

    return added;
  }

  removeProduct(product: Product) {
    console.log(product);
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        if (product.count == 0) {
          this.cart.splice(index, 1);
          this.cartItemCount.next(this.cartItemCount.value - 1);
        } else {
          let newProduct = { ...product };
          let productCountDown = newProduct.count - 1;
          newProduct.count = productCountDown;
          this.cart = this.cart.filter((prod) => prod.id != product.id);
          this.cart.push(newProduct);
          console.log(this.cart);
        }
      }
    }
    this.getTotalCartPrice(this.cart);
  }

  // unsubscribe all observables to  be garbage collectable for high performance ,no memory leaks
  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }
}
