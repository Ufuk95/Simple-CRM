import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

  wrestlingText = `In wrestling, you learn discipline, 
    body control, and mental toughness. It enhances endurance, technique, 
    and the confidence to overcome challenges. 
    Team spirit and respect are also key values taught during training.`;

  strikingText = `In MMA striking, you learn precision, speed, and timing. 
    It develops your ability to read opponents, control distance, and execute powerful, accurate strikes. 
    The training also builds resilience and the discipline to stay focused under pressure.`;

  thaiboxText = `In Thai boxing, you learn powerful striking techniques using fists, elbows, knees, and shins. 
    It emphasizes timing, balance, and the ability to deliver explosive strikes. 
    The training also builds endurance, mental toughness, and the ability to stay calm and composed in intense situations.`;

  sparringText = `In sparring, you learn how to apply techniques in a live, controlled environment. 
    It teaches timing, distance management, and how to react under pressure. 
    Sparring helps build confidence, adaptability, and the ability to stay calm while facing an active opponent.`;

  grapplingText = `In MMA grappling, you learn how to control and dominate opponents on the ground. 
    It focuses on takedowns, submissions, and positional control. 
    The training builds strength, technique, and the ability to stay calm and strategic in close combat situations.`;
}
