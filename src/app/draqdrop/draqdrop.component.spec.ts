import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraqdropComponent } from './draqdrop.component';

describe('DraqdropComponent', () => {
  let component: DraqdropComponent;
  let fixture: ComponentFixture<DraqdropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraqdropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraqdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
