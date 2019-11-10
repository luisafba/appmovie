import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInfoPeliculaComponent } from './editar-info-pelicula.component';

describe('EditarInfoPeliculaComponent', () => {
  let component: EditarInfoPeliculaComponent;
  let fixture: ComponentFixture<EditarInfoPeliculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarInfoPeliculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInfoPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
