import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCapituloComponent } from './crear-capitulo.component';

describe('CrearCapituloComponent', () => {
  let component: CrearCapituloComponent;
  let fixture: ComponentFixture<CrearCapituloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCapituloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCapituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
