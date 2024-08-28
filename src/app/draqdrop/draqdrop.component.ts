import { Component, inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { KanbanworkComponent } from '../kanbanwork/kanbanwork.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { KanbanItem } from '../../models/kanban.class';
import { collection, collectionData, Firestore, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
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
  senseiTasks: KanbanItem[] = [];
  professorTasks: KanbanItem[] = [];
  shihanTasks: KanbanItem[] = [];
  maestroTasks: KanbanItem[] = [];

  connectedTo = ['Sensei', 'Professor', 'Shihan', 'Maestro', 'delete-bin'];

  constructor(public dialog: MatDialog) { }

  drop(event: CdkDragDrop<any[]>) {
    const previousPosition = event.previousContainer.id;
    const currentPosition = event.container.id;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      item.coach = currentPosition; // Update the coach field to reflect the new trainer
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
      this.senseiTasks = changes.filter((task: KanbanItem) => task.coach === 'Sensei');
      this.professorTasks = changes.filter((task: KanbanItem) => task.coach === 'Professor');
      this.shihanTasks = changes.filter((task: KanbanItem) => task.coach === 'Shihan');
      this.maestroTasks = changes.filter((task: KanbanItem) => task.coach === 'Maestro');

    });
  }

  updateTaskPosition(task: KanbanItem) {
    const taskDocRef = doc(this.firestore, `work/${task.id}`);
    updateDoc(taskDocRef, { coach: task.coach });
  }

  deleteTask(event: CdkDragDrop<any[]>) {
    if (event.container.id === 'delete-bin') {
      const task = event.previousContainer.data[event.previousIndex];
  
      if (task && task.id) {
        const taskDocRef = doc(this.firestore, `work/${task.id}`);
        deleteDoc(taskDocRef)
          .then(() => {
            event.previousContainer.data.splice(event.previousIndex, 1);
            console.log('Task deleted:', task);
            this.loadUsers();
          })
          .catch(error => {
            console.error('Error deleting task:', error);
          });
      } else {
        console.error('Task or Task ID not found:', task);
      }
    }
  }
  



  getWorkRef() {
    return collection(this.firestore, 'work');
  }
}
