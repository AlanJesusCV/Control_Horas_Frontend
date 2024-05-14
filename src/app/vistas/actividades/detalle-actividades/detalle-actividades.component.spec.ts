import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleActividadesComponent } from './detalle-actividades.component';

describe('DetalleActividadesComponent', () => {
  let component: DetalleActividadesComponent;
  let fixture: ComponentFixture<DetalleActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
