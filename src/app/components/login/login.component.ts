import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('inputs', { static: false }) inputs: ElementRef

  constructor(
    public modal: ModalController,
    private auth: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
  }

  show_phone = false;
  show_email = false;
  submitted = false;
  phoneValid = false;
  captcha = false;
  showRecaptcha = false;
  showVerificationPhone = false;
  phone: string;
  email: string;
  loading: HTMLIonLoadingElement;
  toLoad: boolean;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;

  ngOnInit() { }

  turnphoneinput() {
    this.show_email = false;
    this.loadCaptcha();
    if (this.show_phone)
      this.show_phone = false;
    else
      this.show_phone = true;
  }

  turnemailinput() {
    this.show_phone = false;
    if (this.show_email)
      this.show_email = false;
    else
      this.show_email = true;
  }

  loginWithFacebook() {
    this.presentLoading();
    this.auth.loginWithFacebook().then(user => {
      this.logged();
    }).catch(_ => {
      this.error();
      this.dismissLoading();
    });
  };

  loginWithGoogle() {
    this.presentLoading();
    this.auth.loginWithGoogle().then(user => {
      this.logged();
    }).catch(() => {
      this.error();
      this.dismissLoading();
    });
  };

  loginWithPhone() {
    this.submitted = true;
    if (!this.phoneValid) {
      return;
    }
    if (!this.captcha) {
      this.presentRecaptcha();
      return;
    }
    else if (this.confirmationResult)
      this.showVerificationPhone = true
    else {
      this.presentLoading();
      this.phoneValid = true;
      this.auth.logInWithPhone(this.phone, this.recaptchaVerifier).then(result => {
        this.confirmationResult = result;
        this.showVerificationPhone = true;
        this.dismissLoading();
      }).catch(error => {
        console.error(error);
      })
    }
  }

  loginWithEmail() {
    // if(this.emailValid)
    this.presentLoading();
    this.auth.sendSignInLinkToEmail(this.email).then(_ => {
      this.linkEnviado();
    }).catch(error => {
    })
  }

  phoneChange() {
    if (this.phone && this.phone.replace(/[^0-9]/g, '').length >= 11)
      this.phoneValid = true;
    else
      this.phoneValid = false;
  }

  verifyPhoneCode(value: string) {

    this.confirmationResult.confirm(value)
      .then(user => {
        this.logged();
      })
      .catch(_ => {
      });
  }

  presentRecaptcha() {
    this.showRecaptcha = true;
    this.loadCaptcha();
  }

  loadCaptcha() {
    if (!this.recaptchaVerifier) {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha');
      this.recaptchaVerifier.render();
      this.recaptchaVerifier.verify().then(_ => {
        this.captcha = true;
        this.showRecaptcha = false;
        this.loginWithPhone();
      });
    }
  }

  closeRecaptcha() {
    this.showRecaptcha = false;
  }

  closeVerificationPhone() {
    this.showVerificationPhone = false;
  }

  codeChange(ev) {
    let value = ev.target.value;
    if (value.length > 5) {
      this.presentLoading();
      this.verifyPhoneCode(ev.target.value);
    }
  }

  logged() {
    this.dismissLoading();
    this.modal.dismiss();
    this.router.navigate(['/home']);
  }

  async presentLoading() {
    this.toLoad = true;
    this.loading = await this.loadingController.create({
      message: 'Aguarde',
      spinner: 'crescent'
    });
    if (this.toLoad)
      await this.loading.present();
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    } else this.toLoad = false;
  }

  async error() {
    let alertError = await this.alertController.create({
      header: 'Houston we have a problem!',
      subHeader: 'Parece que tivemos um problema para tentar fazer login, tente novamente.',
      buttons: ['OK'],
      mode: "ios"
    });

    return await alertError.present();
  }

  async linkEnviado() {
    let message = await this.alertController.create({
      header: 'Link mágico enviado!',
      subHeader: 'Agora é só entrar no seu e-mail e clicar no link que a gente te enviou ;)',
      buttons: ['OK'],
      mode: "ios"
    });

    this.dismissLoading();
    return await message.present();
  }
}
