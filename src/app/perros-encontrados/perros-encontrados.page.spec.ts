import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerrosEncontradosPage } from './perros-encontrados.page';

describe('PerrosEncontradosPage', () => {
  let component: PerrosEncontradosPage;
  let fixture: ComponentFixture<PerrosEncontradosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerrosEncontradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
