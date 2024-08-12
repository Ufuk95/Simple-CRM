import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { collection, doc, Firestore, getDocs } from '@angular/fire/firestore';

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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'] // Korrektur: 'styleUrl' auf 'styleUrls' geändert
})
export class DialogAddUserComponent {

  firestore: Firestore = inject(Firestore)

  user: User = new User();
  birthDate!: Date;

  constructor() {
    this.checkFirebaseConnection();  // Überprüfe die Verbindung bei Initialisierung
  }

  onNoClick() {
  }

  saveUser() {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
      console.log("current user: ", this.user);
    } else {
      console.log("current user: ", this.user);
    }
  }

  getTestRef() {
    return collection(this.firestore, 'test');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  // Methode, um Firebase-Verbindung zu überprüfen
  async checkFirebaseConnection() {
    try {
      const testRef = this.getTestRef();
      const snapshot = await getDocs(testRef);
      snapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
      });
      if (snapshot.empty) {
        console.log('No matching documents.');
      } else {
        console.log('Firebase connection successful.');
      }
    } catch (error) {
      console.error('Error connecting to Firebase:', error);
    }
  }
}
