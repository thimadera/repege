import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    public modal: ModalController
  ) { }

  user: IUser = {};

  ionDateBirth: string;
  ionDateNow: string;

  step: number = 0;

  ngOnInit() {
    let now = new Date();
    now.setHours(now.getHours() - 3);
    now.setFullYear(now.getFullYear() - 7);
    this.ionDateNow = now.toISOString().substr(0, 10);
    console.log(this.ionDateNow)
  }

  sanitizeName(name: string): string {
    name = name.trim();
    var words = name.toLowerCase().split(" ");
    for (var a = 0; a < words.length; a++) {
      var w = words[a];
      words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
  }

  next() {
    console.log(this.ionDateBirth)
    let date = new Date(this.ionDateBirth);
    console.log(date)
    this.step = (this.step + 1) % 2;
    //em construção
  }

}
