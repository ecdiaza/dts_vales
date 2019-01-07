import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeEditarComponent } from './vale-editar.component';

describe('ValeEditarComponent', () => {
  let component: ValeEditarComponent;
  let fixture: ComponentFixture<ValeEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValeEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValeEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
