import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StairComponent } from './stair.component';

describe('StairComponent', () => {
  let component: StairComponent;
  let fixture: ComponentFixture<StairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
