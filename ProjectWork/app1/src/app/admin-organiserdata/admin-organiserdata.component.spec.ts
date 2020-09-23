import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganiserdataComponent } from './admin-organiserdata.component';

describe('AdminOrganiserdataComponent', () => {
  let component: AdminOrganiserdataComponent;
  let fixture: ComponentFixture<AdminOrganiserdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrganiserdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganiserdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
