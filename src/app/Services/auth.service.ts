import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private db: AngularFireDatabase) { }

  login(email: any) {
    return this.db
      .list('/user', (ref) => ref.orderByChild('email').equalTo(email))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((item) => ({
            key: item.key,
            ...item.payload.exportVal()
          }))
        )
      );
  }
}
