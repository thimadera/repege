import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ManageUserService } from './manage-user.service';

@Injectable({
  providedIn: 'root'
})
export class InstallService {

  constructor(
    private alertController: AlertController,
    private manageUser: ManageUserService
  ) { }

  private deferredInstallPrompt: any = null;

  init(window: Window) {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later on the button event.
      this.deferredInstallPrompt = e;
      // Show alert to notify the user they can add to home screen
      this.showAlert(e);
    });
  };

  private async showAlert(e: Event) {
    const alert = await this.alertController.create({
      header: 'Adicionar à tela inicial',
      message: 'Para utilizar este aplicativo, você precisa adicioná-lo à tela inicial!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.denied();
          }
        }, {
          text: 'Adicionar',
          handler: () => {
            this.requestInstallation();
          }
        }],
      mode: "ios"
    });

    await alert.present();
  }

  private denied() {
    return this.manageUser.updateUser({ installed: null });
  }

  private requestInstallation() {
    this.deferredInstallPrompt.prompt();
    this.deferredInstallPrompt.userChoice
      .then(choice => {
        if (choice.outcome === 'accepted')
          this.manageUser.updateUser({ installed: true });
        else
          this.manageUser.updateUser({ installed: null });
      });
    this.deferredInstallPrompt = null;
  }
}
