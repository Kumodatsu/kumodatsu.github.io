import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollingGameComponent } from './rolling-game.component';

describe('RollingGameComponent', () => {
  let component: RollingGameComponent;
  let fixture: ComponentFixture<RollingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollingGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
