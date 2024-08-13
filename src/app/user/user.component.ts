import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';  // Wichtig: Richtig importieren
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  firestore: Firestore = inject(Firestore);
  users$!: Observable<any[]>;
  allUsers: any = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }

  loadUsers() {
    this.users$ = collectionData(this.getUserRef(), { idField: 'id' });
    this.users$.subscribe((changes: any) => {
      console.log('Received changes from DB ', changes);
      this.allUsers = changes;
    });
  }

  getUserRef() {
    return collection(this.firestore, 'user');
  }


  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}

