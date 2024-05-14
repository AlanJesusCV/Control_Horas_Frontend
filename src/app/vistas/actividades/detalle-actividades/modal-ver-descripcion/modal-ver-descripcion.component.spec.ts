import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerDescripcionComponent } from './modal-ver-descripcion.component';

describe('ModalVerDescripcionComponent', () => {
  let component: ModalVerDescripcionComponent;
  let fixture: ComponentFixture<ModalVerDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalVerDescripcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalVerDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
