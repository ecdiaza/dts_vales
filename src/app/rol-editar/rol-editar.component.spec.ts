import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolEditarComponent } from './rol-editar.component';

describe('RolEditarComponent', () => {
  let component: RolEditarComponent;
  let fixture: ComponentFixture<RolEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
