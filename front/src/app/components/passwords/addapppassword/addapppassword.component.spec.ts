import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddapppasswordComponent } from './addapppassword.component';

describe('AddapppasswordComponent', () => {
  let component: AddapppasswordComponent;
  let fixture: ComponentFixture<AddapppasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddapppasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddapppasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
