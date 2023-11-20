import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  async saveUser() {
    this.loading=true;
    this.user.birthdate =  this.birthDate.getTime();
    console.log('Current user is: ', this.user);

    await addDoc(this.getUsersRef(), this.user.toJson()).then((result: any) => {
      console.log('Added new User: ', result);
      this.loading = false;
      this.dialogRef.close();
    });

  }

  onNoClick() {
    
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

}
