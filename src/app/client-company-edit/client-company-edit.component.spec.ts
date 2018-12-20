import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCompanyEditComponent } from './client-company-edit.component';

describe('ClientCompanyEditComponent', () => {
  let component: ClientCompanyEditComponent;
  let fixture: ComponentFixture<ClientCompanyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCompanyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCompanyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
