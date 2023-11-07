import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinacionPgnComponent } from './coordinacion-pgn.component';

describe('CoordinacionPgnComponent', () => {
  let component: CoordinacionPgnComponent;
  let fixture: ComponentFixture<CoordinacionPgnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinacionPgnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinacionPgnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
