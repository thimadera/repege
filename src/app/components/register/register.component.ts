import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(
    public modal: ModalController
  ) { }
  name: string;

  ngOnInit() {
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
    //em construção
  }

}
