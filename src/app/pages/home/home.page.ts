import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.auth.signOut();
  }

}
