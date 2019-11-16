import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInfoPelisComponent } from './admin-info-pelis.component';

describe('AdminInfoPelisComponent', () => {
  let component: AdminInfoPelisComponent;
  let fixture: ComponentFixture<AdminInfoPelisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInfoPelisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInfoPelisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
