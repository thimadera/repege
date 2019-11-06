import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.getParameters();
    if (this.urlParameters.length > 0)
      this.auth.signInWithEmailLink(this.urlParameters[0].value)
  }
  email: string;
  phone: string;
  hide_email: boolean;
  hide_phone: boolean;
  submitted: boolean;
  form_valid: boolean;
  regexEmail = /^[0-9a-zA-Z\-\_\.\+]+@[0-9a-zA-Z\-\_]+(\.[0-9a-zA-Z\-\_]{2,})+$/g;
  finalize_login: boolean;
  urlParameters = [];

  ngOnInit() {
  }

  goto(page: string) {
    console.log("TODO: goto page ", page);
    this.router.navigate([page]);
  }

  ionChange() {
    this.validateForm();
    this.submitted = false;
    if (this.email) {
      this.phone = null;
      this.hide_phone = true;
    }
    else if (this.phone) {
      this.email = null;
      this.hide_email = true;
    }
    else {
      this.hide_phone = false;
      this.hide_email = false;
    }
  }

  sendLink() {
    this.submitted = true;
    if (this.form_valid) {
      if (this.email)
        this.auth.sendSignInLinkToEmail(this.email)
      console.log("valid")
    }
  }

  validateForm() {
    if (this.phone && this.phone.replace(/[^0-9]/g, '').length >= 10)
      this.form_valid = true;
    else if (this.email && this.regexEmail.test(this.email))
      this.form_valid = true;
    else
      this.form_valid = false;

    return false;
  }

  getParameters() {
    if (document.URL.indexOf("?") > 0) {
      let splitURL = document.URL.split("?");
      let splitParams = splitURL[1].split("&");
      let i: any;
      for (i in splitParams) {
        let singleURLParam = splitParams[i].split('=');
        let urlParameter = {
          'name': singleURLParam[0],
          'value': singleURLParam[1]
        };
        this.urlParameters.push(urlParameter);
      }
      console.log(this.urlParameters);
    }
  }

}
