import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidarActComponent } from './modal-validar-act.component';

describe('ModalValidarActComponent', () => {
  let component: ModalValidarActComponent;
  let fixture: ComponentFixture<ModalValidarActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalValidarActComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalValidarActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
