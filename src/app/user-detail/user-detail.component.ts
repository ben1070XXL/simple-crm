import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  Firestore,
  Unsubscribe,
  collection,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit,OnDestroy {
  userId: string = '';
  user: User = new User();

  unsubUser!: Unsubscribe;
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      console.log('GOT ID:', this.userId);
      this.unsubUser = this.getSingleUserRef(this.userId);
    });
  }

  getSingleUserRef(userId: string): Unsubscribe {
    return onSnapshot(doc(this.getUsersRef(), userId), (user) => {
      this.user = new User(user.data());
      console.log('Retreived user: ', this.user);
    });
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  openAddressDialog(){

  }

  editMenu() {
    this.dialog.open(DialogEditAddressComponent);
  }

  editUserDetail(){
    this.dialog.open(DialogEditUserComponent);
  }

  ngOnDestroy(): void {
    this.unsubUser();
  }

}

