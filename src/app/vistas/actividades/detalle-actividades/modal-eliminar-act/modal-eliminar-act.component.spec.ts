import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarActComponent } from './modal-eliminar-act.component';

describe('ModalEliminarActComponent', () => {
  let component: ModalEliminarActComponent;
  let fixture: ComponentFixture<ModalEliminarActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEliminarActComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEliminarActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
