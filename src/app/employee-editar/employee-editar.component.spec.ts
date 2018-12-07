import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditarComponent } from './employee-editar.component';

describe('EmployeeEditarComponent', () => {
  let component: EmployeeEditarComponent;
  let fixture: ComponentFixture<EmployeeEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
