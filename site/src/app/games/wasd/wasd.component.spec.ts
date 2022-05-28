import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WASDComponent } from './wasd.component';

describe('WasdComponent', () => {
  let component: WASDComponent;
  let fixture: ComponentFixture<WASDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WASDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WASDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
