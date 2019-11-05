import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';

let auth: firebase.auth.Auth = null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fire: AngularFireAuth
  ) {
    auth = this.fire.auth;
  }

  loginWithFacebook(): Promise<firebase.User> {
    return new Promise(resolve => {

      let provider = new firebase.auth.FacebookAuthProvider();

      if (auth.currentUser) {
        resolve(this.mergeUser(provider));
        return;
      }

      auth.useDeviceLanguage();

      auth.signInWithPopup(provider).then(result => {

        resolve(result.user);

      }).catch(error => {

        if (error.code === "auth/account-exists-with-different-credential")
          auth.fetchSignInMethodsForEmail(error.email).then(result => {

            alert(`O email ${error.email} já está vinculado à uma conta com o provedor: ${result}`);

          });
      });
    });
  }

  loginWithGoogle(): Promise<firebase.User> {
    return new Promise(resolve => {

      let provider = new firebase.auth.GoogleAuthProvider();

      if (auth.currentUser) {
        resolve(this.mergeUser(provider));
        return;
      }

      auth.useDeviceLanguage();

      auth.signInWithPopup(provider).then(result => {

        resolve(result.user);

      }).catch(error => {

        if (error.code === "auth/account-exists-with-different-credential")
          auth.fetchSignInMethodsForEmail(error.email).then(result => {

            alert(`O email ${error.email} já está vinculado à uma conta com o provedor: ${result}`);

          });
      });
    });
  }


  mergeUser(provider: firebase.auth.AuthProvider): Promise<firebase.User> {
    return new Promise(resolve => {

      auth.currentUser.linkWithPopup(provider).then(result => {

        resolve(result.user);

      }).catch(function (error) {
        if (error.code === "auth/provider-already-linked")
          resolve(auth.currentUser);
      });
    });
  }
}
