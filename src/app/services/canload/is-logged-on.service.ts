import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class isLoggedOn implements CanLoad {

  constructor(
    private fire: AngularFireAuth,
    private router: Router
  ) { }

  canLoad(): Promise<boolean> {
    return new Promise(resolve => {
      this.fire.auth.onAuthStateChanged(user => {
        if (user)
          resolve(true);
        else {
          this.router.navigate(['onboarding']);
          resolve(false);
        }
      });
    });
  };
}
