import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADreamWithinADreamComponent } from './a-dream-within-a-dream.component';

describe('ADreamWithinADreamComponent', () => {
  let component: ADreamWithinADreamComponent;
  let fixture: ComponentFixture<ADreamWithinADreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ADreamWithinADreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ADreamWithinADreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
