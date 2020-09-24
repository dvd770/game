import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerElementComponent } from './power-element.component';

describe('PowerElementComponent', () => {
  let component: PowerElementComponent;
  let fixture: ComponentFixture<PowerElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
