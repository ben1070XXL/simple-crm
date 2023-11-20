import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  user = new User();
  allUsers: any = [];

  firestore: Firestore = inject(Firestore);
  unsubUsers: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.unsubUsers = this.subUsersList();
  }

  subUsersList() {
    return onSnapshot(this.getUsersRef(), (users) => {
      console.log('Received changes from DB: ', users);
      this.allUsers = [];

      users.forEach((user) => {
        this.allUsers.push(this.setUserObject(user.data(), user.id));
      })

      console.log('Current Users: ', this.allUsers);
    });
  }

  setUserObject(obj: any, id: string) {
    return {
      id: id || "",
      firstname: obj.firstname || "",
      lastname:  obj.lastname || "",
      email:  obj.email || "",
      birthdate:  obj.birthdate || "",
      street:  obj.street || "",
      zipCode:  obj.zipCode || "",
      city:  obj.city || ""
    }
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  ngOnDestroy(): void {
    this.unsubUsers();
  }


}
