import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import validateSigninInput from '../Validation/validateSigninInput';
import * as bcrypt from 'bcryptjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  errors: any = {};

  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }
    const { errors, isInvalid } = validateSigninInput(user)

    if (isInvalid) {
      this.errors = errors;
    } else {
      this.errors = {};
      this.auth.login(this.email).subscribe((resp: any) => {
        console.log(resp)
        if (resp.length > 0) {
          const [user] = resp;
          bcrypt.compare(this.password, user.password).then((isMatch) => {
            if (isMatch) {
              // redirect to dashboard
              localStorage.setItem(
                'loggedIn', JSON.stringify({ name: user.name, isAdmin: user.isAdmin })
              );
              // ******************************************************************
              if (user.isAdmin) {
                this.router.navigateByUrl('dashboard')
              }
              // ******************************************************************
            } else {
              this.errors.password = "Incorrect Password"
            }
          })
        } else {
          this.errors.email = "Email does not exists."
        }
      })
    }
  }

}
