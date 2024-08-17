import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanworkComponent } from './kanbanwork.component';

describe('KanbanworkComponent', () => {
  let component: KanbanworkComponent;
  let fixture: ComponentFixture<KanbanworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
