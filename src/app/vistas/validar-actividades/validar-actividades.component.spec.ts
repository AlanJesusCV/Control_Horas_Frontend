import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarActividadesComponent } from './validar-actividades.component';

describe('ValidarActividadesComponent', () => {
  let component: ValidarActividadesComponent;
  let fixture: ComponentFixture<ValidarActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidarActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidarActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
