import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModalController, Platform, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  // @ViewChild('slides', { static: false }) slides: IonSlides

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
    // autoHeight: true,
    loop: true,
    simulateTouch: true,
    autoplay: {
      delay: 10000
    }
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
    // this.slides.updateAutoHeight();
  }

}
