import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrMaskerModule } from 'br-mask';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IonicStorageModule } from '@ionic/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyD3-tDTYh-OzoXpVa9i00IaV5RKddgVtl8",
  authDomain: "repege-prototype.firebaseapp.com",
  databaseURL: "https://repege-prototype.firebaseio.com",
  projectId: "repege-prototype",
  storageBucket: "repege-prototype.appspot.com",
  messagingSenderId: "417589679555",
  appId: "1:417589679555:web:65434d2cce04ea09d81976"
};

@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent],
  entryComponents: [RegisterComponent, LoginComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    BrMaskerModule,
    IonicStorageModule,
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
