import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEstatusUsuariosComponent } from './modal-estatus-usuarios.component';

describe('ModalEstatusUsuariosComponent', () => {
  let component: ModalEstatusUsuariosComponent;
  let fixture: ComponentFixture<ModalEstatusUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEstatusUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEstatusUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
