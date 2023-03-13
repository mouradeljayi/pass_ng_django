import { TestBed } from '@angular/core/testing';
import { AuthGuard2Service } from './auth-guard2.service';


describe('AuthGuard2Service', () => {
  let service: AuthGuard2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuard2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
