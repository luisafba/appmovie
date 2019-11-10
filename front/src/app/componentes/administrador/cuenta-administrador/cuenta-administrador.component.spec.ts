import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaAdministradorComponent } from './cuenta-administrador.component';

describe('CuentaAdministradorComponent', () => {
  let component: CuentaAdministradorComponent;
  let fixture: ComponentFixture<CuentaAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
