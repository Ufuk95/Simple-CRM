import { Component, ElementRef, ViewChild, HostListener, AfterViewInit, Renderer2, OnInit, inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { Firestore, collection, getDocs, onSnapshot } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatCardModule,
    MatBadgeModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit {

  selected: Date | null = null;
  customCount: number = 0;
  workCount: number = 0;
  customBadgeHidden: boolean = true;
  workBadgeHidden: boolean = true;
  firestore: Firestore = inject(Firestore);
  showButtons: boolean = false;

  today: string = '';
  training: string = '';

  @ViewChild('hourHand') hourHand!: ElementRef;
  @ViewChild('minuteHand') minuteHand!: ElementRef;
  @ViewChild('secondHand') secondHand!: ElementRef;
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;

  private chart!: Chart;

  private daysOfWeek: Record<string, string> = {
    'Monday': 'Wrestling',
    'Tuesday': 'MMA Striking',
    'Wednesday': 'Kick/Thai Boxing',
    'Thursday': 'Sparring',
    'Friday': 'MMA Grappling',
    'Saturday': 'Free',
    'Sunday': 'Free'
  };

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setTodayAndTraining();
    this.initializeBarChart();
    this.onResize();

    // Firebase Snapshot Listener für Echtzeit-Updates
    const userCollection = collection(this.firestore, 'user');
    onSnapshot(userCollection, (snapshot) => {
      this.customCount = snapshot.size;
      this.updateBarChart();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event): void {
    this.showButtons = window.innerWidth < 650;
  }

  ngAfterViewInit() {
    this.startClock();
  }

  async getCustomerCount() {
    this.customBadgeHidden = !this.customBadgeHidden;
    const userCollection = collection(this.firestore, 'user');
    const userSnapshot = await getDocs(userCollection);
    this.customCount = userSnapshot.size;
    this.updateBarChart();
  }

  async getWorkCount() {
    this.workBadgeHidden = !this.workBadgeHidden;
    const workCollection = collection(this.firestore, 'work');
    const workSnapshot = await getDocs(workCollection);
    this.workCount = workSnapshot.size;
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

  async initializeBarChart() {
    try {
      // User Collection
      const userCollection = collection(this.firestore, 'user');
      const userSnapshot = await getDocs(userCollection);
      const userCount = userSnapshot.size;
  
      // Work Collection
      const workCollection = collection(this.firestore, 'work');
      const workSnapshot = await getDocs(workCollection);
      const workCount = workSnapshot.size;
  
      this.chart = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['current state'],
          datasets: [
            {
              data: [userCount],
              label: 'Members',
              backgroundColor: '#DAA520',
              barThickness: 150, // Breite der User Bar
            },
            {
              data: [workCount],
              label: 'Work to do',
              backgroundColor: '#FF4500',
              barThickness: 150, // Breite der Work Bar
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              min: 0,
              max: 10
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing chart:', error);
    }
  }
  
  async updateBarChart() {
    try {
      // User Collection
      const userCollection = collection(this.firestore, 'user');
      const userSnapshot = await getDocs(userCollection);
      const userCount = userSnapshot.size;
  
      // Work Collection
      const workCollection = collection(this.firestore, 'work');
      const workSnapshot = await getDocs(workCollection);
      const workCount = workSnapshot.size;
  
      console.log('Updating chart with user count:', userCount);
      console.log('Updating chart with work count:', workCount);
  
      if (this.chart) {
        this.chart.data.datasets[0].data = [userCount]; // Update User Data
        this.chart.data.datasets[1].data = [workCount]; // Update Work Data
  
        this.chart.update(); // Diagramm aktualisieren
      } else {
        await this.initializeBarChart(); // Diagramm erstellen, wenn es noch nicht existiert
      }
    } catch (error) {
      console.error('Error updating chart:', error);
    }
  }
    
}
