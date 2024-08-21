import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, OnInit } from '@angular/core';
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
export class DashboardComponent implements AfterViewInit, OnInit {

  selected: Date | null = null;
  customCount: number = 0;
  workCount: number = 0;
  customBadgeHidden: boolean = true;
  workBadgeHidden: boolean = true;  

  today: string = '';
  training: string = '';

  @ViewChild('hourHand') hourHand!: ElementRef;
  @ViewChild('minuteHand') minuteHand!: ElementRef;
  @ViewChild('secondHand') secondHand!: ElementRef;

  // Definiere einen Typ für die Wochentage
  private daysOfWeek: Record<string, string> = {
    'Monday': 'Wrestling',
    'Tuesday': 'MMA Striking',
    'Wednesday': 'Kick/Thai Boxing',
    'Thursday': 'Sparring',
    'Friday': 'MMA Grappling',
    'Saturday': 'Free',
    'Sunday': 'Free'
  };

  constructor(private firestore: Firestore, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setTodayAndTraining();
  }

  async getCustomerCount() {
    this.customBadgeHidden = !this.customBadgeHidden;
    const userCollection = collection(this.firestore, 'user');
    const userSnapshot = await getDocs(userCollection);
    this.customCount = userSnapshot.size;
  }

  async getWorkCount() {
    this.workBadgeHidden = !this.workBadgeHidden; 
    const workCollection = collection(this.firestore, 'work');
    const workSnapshot = await getDocs(workCollection);
    this.workCount = workSnapshot.size; 
  }

  ngAfterViewInit() {
    this.startClock();
  }

  startClock() {
    setInterval(() => {
      if (!this.hourHand || !this.minuteHand || !this.secondHand) {
        return;
      }
  
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();
  
      const secondsDegrees = ((seconds / 60) * 360) + 90;
      const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
      const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
  
      this.renderer.setStyle(this.secondHand.nativeElement, 'transform', `rotate(${secondsDegrees}deg)`);
      this.renderer.setStyle(this.minuteHand.nativeElement, 'transform', `rotate(${minutesDegrees}deg)`);
      this.renderer.setStyle(this.hourHand.nativeElement, 'transform', `rotate(${hoursDegrees}deg)`);
    }, 1000);
  }

  setTodayAndTraining() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const dayName = daysOfWeek[now.getDay()] as keyof typeof this.daysOfWeek;

    this.today = dayName;
    this.training = this.daysOfWeek[dayName] || 'No Training';
  }
}
