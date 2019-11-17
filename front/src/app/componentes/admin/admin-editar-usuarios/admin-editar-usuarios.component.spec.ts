import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditarUsuariosComponent } from './admin-editar-usuarios.component';

describe('AdminEditarUsuariosComponent', () => {
  let component: AdminEditarUsuariosComponent;
  let fixture: ComponentFixture<AdminEditarUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditarUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
