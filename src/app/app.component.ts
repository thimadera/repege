import { Component, OnInit } from '@angular/core';
import { InstallService } from './services/install.service';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private install: InstallService,
    private swUpdate: SwUpdate,
    private toast: ToastController,
    private auth: AuthService,
    private router: Router
  ) {
    this.checkForUpdates();
  }

  ngOnInit() {
    this.install.init(window);
  };

  checkForUpdates() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(update => {
        this.showToast();
      });
    };
  };

  async showToast() {
    const toast = await this.toast.create({
      message: 'Atualização disponível',
      position: 'bottom',
      mode: 'md',
      buttons: [{
        text: 'Instalar',
        handler: () => {
          location.reload();
        }
      }
      ]
    });
    toast.present();

  }
}
