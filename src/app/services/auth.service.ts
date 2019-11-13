import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

let auth: firebase.auth.Auth = null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fire: AngularFireAuth,
    private router: Router
  ) {
    auth = this.fire.auth;
  }

  signOut() {
    auth.signOut();
  }

  loginWithFacebook(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {

      let provider = new firebase.auth.FacebookAuthProvider();

      if (auth.currentUser) {
        resolve(this.mergeUser(provider));
        return;
      }

      auth.useDeviceLanguage();

      auth.signInWithPopup(provider).then(result => {

        resolve(result.user);

      }).catch(error => {
        reject(error);
      });
    });
  }

  loginWithGoogle(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {

      let provider = new firebase.auth.GoogleAuthProvider();

      if (auth.currentUser) {
        resolve(this.mergeUser(provider));
        return;
      }

      auth.useDeviceLanguage();

      auth.signInWithPopup(provider).then(result => {

        resolve(result.user);

      }).catch(error => {
        reject(error);
      });
    });
  }

  logInWithPhone(phone: string, appVerifier: firebase.auth.ApplicationVerifier): Promise<any> {
    return new Promise(resolve => {
      let fullPhone = `+55${phone.replace(/[^0-9]/g, '')}`;
      firebase.auth().signInWithPhoneNumber(fullPhone, appVerifier)
        .then(confirmationResult => {
          resolve(confirmationResult)
        }).catch(error => {
          throw new Error(error);
        });
    });
  }

  sendSignInLinkToEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      auth.sendSignInLinkToEmail(email, {
        url: `http://localhost:8100/onboarding?finalizeLogin=${email}`,
        handleCodeInApp: true
      }).then(_ => {
        resolve();
      }).catch(error => {
        reject(error);
      })
    })
    // TODO : Tratar recebimento de informação do firebase e informar o usuário para acessar o email
  }

  signInWithEmailLink(email: string) {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailLink(email).then(result => {
        resolve(result);
      }).catch(error => {
        reject(error);
      })
    })
    // TODO : Tratar recebimento de informação do firebase, entrar no app e informar mensagens de possíveis erros
  }


  private mergeUser(provider: firebase.auth.AuthProvider): Promise<firebase.User> {
    return new Promise(resolve => {

      auth.currentUser.linkWithPopup(provider).then(result => {

        resolve(result.user);

      }).catch(function (error) {
        resolve(auth.currentUser);
      });
    });
  }
}
