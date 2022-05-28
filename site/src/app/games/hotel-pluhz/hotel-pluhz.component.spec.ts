import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPluhzComponent } from './hotel-pluhz.component';

describe('HotelPluhzComponent', () => {
  let component: HotelPluhzComponent;
  let fixture: ComponentFixture<HotelPluhzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelPluhzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelPluhzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
