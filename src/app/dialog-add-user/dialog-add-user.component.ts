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
import { addDoc, collection, doc, Firestore, getDocs } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
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
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'] // Korrektur: 'styleUrl' auf 'styleUrls' geändert
})
export class DialogAddUserComponent {

  firestore: Firestore = inject(Firestore)

  user: User = new User();
  birthDate!: Date;
  loading = false;

  constructor(public dialog: MatDialogRef<DialogAddUserComponent>) {

  }

  onNoClick() {
  }

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    await addDoc(this.getUserRef(), this.user.toJSON());
    this.loading = false;
    this.dialog.close();
  }


  getUserRef() {
    return collection(this.firestore, 'user');
  }


  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

}
