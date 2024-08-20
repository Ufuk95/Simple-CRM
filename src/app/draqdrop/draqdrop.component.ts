import { Component, inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { KanbanworkComponent } from '../kanbanwork/kanbanwork.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { KanbanItem } from '../../models/kanban.class';
import { collection, collectionData, Firestore, updateDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-draqdrop',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './draqdrop.component.html',
  styleUrl: './draqdrop.component.scss'
})
export class DraqdropComponent implements OnInit {

  work: KanbanItem = new KanbanItem();
  firestore: Firestore = inject(Firestore);
  works$!: Observable<any[]>;
  todoTasks: KanbanItem[] = [];
  waitingTasks: KanbanItem[] = [];
  treatmentTasks: KanbanItem[] = [];
  doneTasks: KanbanItem[] = [];

  connectedTo = ['todo', 'waiting', 'treatment', 'done'];

  constructor(public dialog: MatDialog){}

  drop(event: CdkDragDrop<any[]>) {
    const previousPosition = event.previousContainer.id;
    const currentPosition = event.container.id;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      item.position = currentPosition; // Update the item's position
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateTaskPosition(item); // Save the updated position to Firebase
    }
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  openDialog() {
    const dialogRef = this.dialog.open(KanbanworkComponent);
  }

  loadUsers() {
    this.works$ = collectionData(this.getWorkRef(), { idField: 'id' });
    this.works$.subscribe((changes: any) => {
      console.log('Received changes from DB ', changes);
      this.todoTasks = changes.filter((task: KanbanItem) => task.position === 'todo');
      this.waitingTasks = changes.filter((task: KanbanItem) => task.position === 'waiting');
      this.treatmentTasks = changes.filter((task: KanbanItem) => task.position === 'treatment');
      this.doneTasks = changes.filter((task: KanbanItem) => task.position === 'done');
    });
  }

  updateTaskPosition(task: KanbanItem) {
    const taskDocRef = doc(this.firestore, `work/${task.id}`);
    updateDoc(taskDocRef, { position: task.position });
  }

  getWorkRef() {
    return collection(this.firestore, 'work');
  }
}
