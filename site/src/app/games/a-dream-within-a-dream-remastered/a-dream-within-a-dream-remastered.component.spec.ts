import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADreamWithinADreamRemasteredComponent } from './a-dream-within-a-dream-remastered.component';

describe('ADreamWithinADreamRemasteredComponent', () => {
  let component: ADreamWithinADreamRemasteredComponent;
  let fixture: ComponentFixture<ADreamWithinADreamRemasteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ADreamWithinADreamRemasteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ADreamWithinADreamRemasteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
