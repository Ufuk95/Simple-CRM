import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, doc, Firestore, getDocs } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { KanbanItem } from '../../models/kanban.class';

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
    MatProgressBarModule,
    MatSidenavModule,
    MatOption,
    MatSelectModule

  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './kanbanwork.component.html',
  styleUrl: './kanbanwork.component.scss'
})
export class KanbanworkComponent {

  work: KanbanItem = new KanbanItem();
  firestore: Firestore = inject(Firestore);
  loading = false;

  constructor(public dialog: MatDialogRef<KanbanworkComponent>) { }



  async saveWork() {
    this.loading = true;
    await addDoc(this.getWorkRef(), this.work.toJSON());
    this.loading = false;
    this.dialog.close();
  }


  getWorkRef() {
    return collection(this.firestore, 'work');
  }
}
