import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModalController, IonSlides, NavParams, Platform, LoadingController } from '@ionic/angular';
import { RegisterComponent } from '../../components/register/register.component';
import { LoginComponent } from '../../components/login/login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  @ViewChild('slides', { static: false }) slides: IonSlides

  constructor(
    private fire: AngularFireAuth,
    private modal: ModalController,
    private platform: Platform,
    private auth: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.canLoad();
    let emailFinalize = this.platform.getQueryParam('finalizeLogin');
    if (emailFinalize) {
      this.presentLoading();
      this.auth.signInWithEmailLink(emailFinalize).then(response => {
        this.router.navigate(['home']);
        this.dismissLoading();
      });
    }
  }

  slideOpts = {
    autoHeight: true,
    loop: true,
    autoplay: true
  };

  appName = environment.app_name;

  toLoad = false;
  loading: HTMLIonLoadingElement;

  canLoad() {
    return new Promise(resolve => {
      this.fire.auth.onAuthStateChanged(user => {
        if (user)
          this.router.navigate(['home']);
      });
    });
  };

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

  ngOnInit() {
    // this.presentLogin();
  }

  ionViewDidEnter() {
    this.slides.updateAutoHeight();
  }

  async presentRegister() {
    const modal = await this.modal.create({
      component: RegisterComponent,
      mode: 'ios'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data && data.todo == "presentLogin")
      this.presentLogin();
  }

  async presentLogin() {
    const modal = await this.modal.create({
      component: LoginComponent,
      mode: 'ios'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data && data.todo == "presentRegister")
      this.presentRegister();
  }

}
