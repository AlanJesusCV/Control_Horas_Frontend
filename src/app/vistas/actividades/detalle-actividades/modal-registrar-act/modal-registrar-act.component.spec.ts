import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistrarActComponent } from './modal-registrar-act.component';

describe('ModalRegistrarActComponent', () => {
  let component: ModalRegistrarActComponent;
  let fixture: ComponentFixture<ModalRegistrarActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalRegistrarActComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRegistrarActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
