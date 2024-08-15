import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {

  loading = false;
  user!: User;
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  userId!: string;



  constructor(public dialog: MatDialogRef<DialogEditUserComponent>) {

  }

  saveUser() {
    this.loading = true;
    const userDocRef = this.getSingleDocRef('user', this.userId);

    updateDoc(userDocRef, this.user.toJSON()).then(() => {
      console.log('User updated successfully');
      this.loading = false;
      this.dialog.close();
    }).catch((error) => {
      console.error('Error updating user: ', error);
      this.loading = false;
    });
  }

  getUserRef() {
    return collection(this.firestore, 'user');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

}
