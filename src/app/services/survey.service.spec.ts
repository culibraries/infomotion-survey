import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SurveyService } from './survey.service';
import { CookieService } from 'ngx-cookie-service';

describe('SurveyService', () => {

  let service: SurveyService;
  let httpService: HttpClient;
  let cookieService: CookieService;

  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SurveyService]
    });

    service = TestBed.get(service);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('#getIsContentShow should return value from observable',
    (done: DoneFn) => {
    service.getIsContentShow().subscribe(value => {
      expect(value).toBe(true);
      done();
    });
  });

  it('#getIsSuccessNotificationShow should return value from observable',
    (done: DoneFn) => {
    service.getIsSuccessNotificationShow().subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });

  it('#getIsAlertNotificationShow should return value from observable',
    (done: DoneFn) => {
    service.getIsAlertNotificationShow().subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });
  // it('should be created', () => {
  //   const service: SurveyService = TestBed.get(SurveyService);
  //   expect(service).toBeTruthy();
  // });

});
