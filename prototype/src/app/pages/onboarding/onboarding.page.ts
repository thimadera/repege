import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  @ViewChild('slides', { static: true }) slides: IonSlides;

  // TODO: Return welcome page if has done onboarding

  isBeginning = true;
  isEnd = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  changeSlide() {
    this.slides.isEnd().then(isEnd => {
      this.isEnd = isEnd;
    });
    this.slides.isBeginning().then(isBeginning => {
      this.isBeginning = isBeginning;
    });
  };

  ngOnInit() { }

  goto(page: string) {
    console.log("TODO: goto page ", page);
    this.router.navigate([page]);
  }

  loginWithFacebook() {
    this.auth.loginWithFacebook().then(user => {
      if (user)
        console.log(user.uid);
    });
  };

  loginWithGoogle() {
    this.auth.loginWithGoogle().then(user => {
      if (user)
        console.log(user.uid);
    });
  };

}
