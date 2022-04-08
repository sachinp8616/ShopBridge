import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: any = {
    title: '',
    price: '',
    desc: '',
    imgUrl: '',
  }
  id: any;
  dowonlodURL: any;

  constructor(private storage: AngularFireStorage, private router: Router, private admin: AdminService, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if(this.id){
      this.admin.getProduct(this.id).subscribe(resp => {
        this.product = resp
      })
    }
  }

  ngOnInit(): void {
  }

  onUpload(event: any) {

    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.dowonlodURL = fileRef.getDownloadURL();
          this.dowonlodURL.subscribe((url:any) => {
            if (url) {
              this.product.imgUrl = url;
            }
            console.log(this.product.imgUrl);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  onCreateProduct() {
    if (this.id) {
      this.admin.updateProduct(this.id, this.product);
    } else {
      this.admin.createProduct(this.product);
    }
    this.router.navigateByUrl('dashboard')
  }


}
