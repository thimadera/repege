import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(
    private storage: Storage
  ) { }

  sanitizeName(name: string): string {
    name = name.trim();
    var words = name.toLowerCase().split(" ");
    for (var a = 0; a < words.length; a++) {
      var w = words[a];
      words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
  }

  updateUser(newData: IUser): Promise<any> {

    return new Promise(resolve => {

      if (newData.name)

        newData.name = this.sanitizeName(newData.name);

      // Getting old data from storage
      this.storage.get("userData").then((oldData: IUser) => {

        let data: IUser = {};

        if (oldData != null) {

          // Merging old infos
          Object.keys(oldData).forEach(key => {
            data[key] = oldData[key];
          });
        };

        // Saving firebase uid
        if (firebase.auth().currentUser)
          data.firebase_uid = firebase.auth().currentUser.uid;

        // Merging new infos
        Object.keys(newData).forEach(key => {

          data[key] = newData[key];
          if (oldData)
            if (!data[key] && !oldData[key])
              oldData[key] = null;
        });

        // Safe not-updating for equals data
        if (oldData)
          if (JSON.stringify(oldData) == JSON.stringify(data)) {
            resolve(newData);
            return;
          };

        // Saving data to Firebase
        if (data && oldData) {

          if (data.name && data.name != oldData.name)
            try {
              firebase.auth().currentUser.updateProfile({
                displayName: data.name
              });
            } catch{ };

          if (data.email && data.email != oldData.email)
            try {
              firebase.auth().currentUser.updateEmail(data.email);
            } catch{ };
        };

        // Saving data in storage
        this.storage.set('userData', data);
        resolve(data);
      });
    });
  };


  get(): Promise<any> {

    return new Promise(resolve => {

      this.storage.get('userData').then(user => {
        resolve(user);

      });
    });
  };

  delete(): Promise<boolean> {

    return new Promise(resolve => {

      this.storage.remove('userData').then(user => {
        resolve(true);

      }).catch(_error => {

        throw new Error("Error trying to delete user infos");

      });
    });
  };
};
