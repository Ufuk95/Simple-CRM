import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatCardModule,
    MatBadgeModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  selected: Date | null = null;
  customCount: number = 0;
  workCount: number = 0;
  customBadgeHidden: boolean = true; // Separate hidden-Variable für den Kunden-Badge
  workBadgeHidden: boolean = true;   // Separate hidden-Variable für den Arbeits-Badge

  constructor(private firestore: Firestore) {}

  async getCustomerCount() {
    this.customBadgeHidden = !this.customBadgeHidden; // Nur den Kunden-Badge umschalten
    const userCollection = collection(this.firestore, 'user');
    const userSnapshot = await getDocs(userCollection);
    this.customCount = userSnapshot.size; // Anzahl der Dokumente in der 'user' Sammlung
  }

  async getWorkCount() {
    this.workBadgeHidden = !this.workBadgeHidden; // Nur den Arbeits-Badge umschalten
    const workCollection = collection(this.firestore, 'work');
    const workSnapshot = await getDocs(workCollection);
    this.workCount = workSnapshot.size; // Anzahl der Dokumente in der 'work' Sammlung
  }
}
