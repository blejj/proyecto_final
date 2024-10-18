import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerrosPerdidosPage } from './perros-perdidos.page';

describe('PerrosPerdidosPage', () => {
  let component: PerrosPerdidosPage;
  let fixture: ComponentFixture<PerrosPerdidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerrosPerdidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
