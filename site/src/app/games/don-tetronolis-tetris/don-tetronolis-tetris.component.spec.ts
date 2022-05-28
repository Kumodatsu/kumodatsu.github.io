import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonTetronolisTetrisComponent } from './don-tetronolis-tetris.component';

describe('DonTetronolisTetrisComponent', () => {
  let component: DonTetronolisTetrisComponent;
  let fixture: ComponentFixture<DonTetronolisTetrisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonTetronolisTetrisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonTetronolisTetrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
