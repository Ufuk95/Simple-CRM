import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { collection, doc, docData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'] // Korrigiert von "styleUrl" zu "styleUrls"
})
export class UserDetailComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  userId = "";
  users$!: Observable<any[]>;
  user: User = new User();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id') ?? '';
      console.log("Got the ID:", this.userId);
      this.getUser(); // Ruft die Methode auf, um den User zu holen
    });
  }

  getUser(): void {
    const userDocRef = doc(this.firestore, `user/${this.userId}`);
    docData(userDocRef).subscribe((user: any) => {
      this.user = new User(user);
      console.log('Retrieved user: ', this.user)
    })

  }

  getUserRef() {
    return collection(this.firestore, 'user');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

}
