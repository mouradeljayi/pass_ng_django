import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpdComponent } from './app-upd.component';

describe('AppUpdComponent', () => {
  let component: AppUpdComponent;
  let fixture: ComponentFixture<AppUpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUpdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
