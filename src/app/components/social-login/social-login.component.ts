import { Component } from "@angular/core";
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
})
export class SocialLoginComponent {

  constructor(
    private auth: AuthService
  ) { }

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
