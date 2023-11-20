import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;
  firestore: Firestore = inject(Firestore);

  constructor() {}

  async saveUser() {
    this.loading=true;
    this.user.birthdate =  this.birthDate.getTime();
    console.log('Current user is: ', this.user);

    await addDoc(this.getUsersRef(), this.user.toJson()).then((result: any) => {
      console.log('Added new User: ', result);
      this.loading = false;
    });

  }

  onNoClick() {
    
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

}
