import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private db: AngularFireDatabase) { }

  loggedIn() {
    const loggedIn: any = localStorage.getItem('loggedIn');
    console.log(loggedIn);
    const user = JSON.parse(loggedIn);
    if (user.isAdmin) {
      return true;
    } else {
      return false;
    }
  }

  createProduct(product: any) {
    return this.db.list('products/').push(product)
  }

  getProducts() {
    return this.db.list('products/').snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map(item => ({
            key: item.key,
            ...item.payload.exportVal()
          })))
      )
  }

  getProduct(id: any) {
    return this.db.object('products/' + id).valueChanges();
  }

  updateProduct(id: any, product: any) {
    return this.db.object('products/' + id).update(product);
  }

  deleteProduct(id: any) {
    return this.db.list('products/').remove(id)
  }
}
