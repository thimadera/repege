import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { isLoggedOn } from './services/canload/is-logged-on.service';
import { isLoggedOff } from './services/canload/is-logged-off.service';

const routes: Routes = [
  {
    path: '', redirectTo: 'onboarding', pathMatch: 'full'
  },
  {
    path: 'onboarding', loadChildren: './pages/onboarding/onboarding.module#OnboardingPageModule',
    canLoad: [isLoggedOff]
  },
  {
    path: 'home', loadChildren: './pages/home/home.module#HomePageModule',
    canLoad: [isLoggedOn]
  },  { path: 'login', loadChildren: './pages/onboarding/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/onboarding/register/register.module#RegisterPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
