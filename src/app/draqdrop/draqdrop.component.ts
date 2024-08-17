import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { KanbanworkComponent } from '../kanbanwork/kanbanwork.component';
import { MatTooltipModule } from '@angular/material/tooltip';


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
export class DraqdropComponent {
  columns = [
    {
      name: 'To do',
      tasks: [
        { name: 'Task 1' },
        { name: 'Task 2' },
        { name: 'Task 3' },
      ],
    },
    {
      name: 'Waiting',
      tasks: [],
    },
    {
      name: 'Treatment',
      tasks: [],
    },
    {
      name: 'Done',
      tasks: [],
    },
  ];

  constructor(public dialog: MatDialog){}

  connectedTo = this.columns.map((_, index) => `list-${index}`);

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(KanbanworkComponent);
  }
}
