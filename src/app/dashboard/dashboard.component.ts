import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any = [];
  p: number = 1;

  constructor(private router: Router, private admin: AdminService) { }

  ngOnInit(): void {
    this.ongetProducts();
  }

  gotoProductForm() {
    this.router.navigateByUrl('product-form')
  }

  ongetProducts() {
    this.admin.getProducts().subscribe((resp) => {
      this.products = resp;
      console.log(resp);
    })
  }

  onEditProduct(id: any) {
    this.router.navigateByUrl('product-form/' + id)
  }

  onDeleteProduct(id: any) {
    if (confirm('Do you want to delete this Product?')) {
      this.admin.deleteProduct(id);
      this.router.navigateByUrl('product-form')
    }
  }

}
