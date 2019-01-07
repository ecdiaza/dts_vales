import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeComponent } from './vale.component';

describe('ValeComponent', () => {
  let component: ValeComponent;
  let fixture: ComponentFixture<ValeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
