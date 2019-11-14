import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListaPelisComponent } from './admin-lista-pelis.component';

describe('AdminListaPelisComponent', () => {
  let component: AdminListaPelisComponent;
  let fixture: ComponentFixture<AdminListaPelisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListaPelisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListaPelisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
