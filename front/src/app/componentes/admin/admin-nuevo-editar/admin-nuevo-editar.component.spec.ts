import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNuevoEditarComponent } from './admin-nuevo-editar.component';

describe('AdminNuevoEditarComponent', () => {
  let component: AdminNuevoEditarComponent;
  let fixture: ComponentFixture<AdminNuevoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNuevoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNuevoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
