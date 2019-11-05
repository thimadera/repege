import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OnboardingPage } from './onboarding.page';
import { SocialLoginModule } from 'src/app/components/social-login/social-login.module';

const routes: Routes = [
  {
    path: '',
    component: OnboardingPage
  }
];

@NgModule({
  imports: [
    SocialLoginModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OnboardingPage]
})
export class OnboardingPageModule {}
