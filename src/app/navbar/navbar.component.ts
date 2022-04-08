import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSignOut() {
    localStorage.removeItem('loggedIn')
    this.router.navigateByUrl('/')
  }

  get loggedIn() {
    const userInfo = !!localStorage.getItem('loggedIn');
    return userInfo;
  }

  get userInfo() {
    const userinfo: any = localStorage.getItem('loggedIn');
    return JSON.parse(userinfo);
  }

}
