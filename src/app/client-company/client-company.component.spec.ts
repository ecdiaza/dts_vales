import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCompanyComponent } from './client-company.component';

describe('ClientCompanyComponent', () => {
  let component: ClientCompanyComponent;
  let fixture: ComponentFixture<ClientCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
