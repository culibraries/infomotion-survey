import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('Should get user information', done => {
    const mockUsers = {
      'auth-token': 'random string',
      email: 'test@test.com',
      group: ['infomotion-user'],
      last_name: 'test',
      name: 'test test',
      username: 'test'
    };
    authService.getUserInformation().subscribe((data: any) => {
      expect(data).toEqual(mockUsers);
    });

    const userRequest = httpMock.expectOne('/users');
    // expect(userRequest.request.responseType).toEqual('json');
    // userRequest.flush(mockUsers);
    // httpMock.verify();
  });
});
