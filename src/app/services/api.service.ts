import { Injectable } from '@angular/core';
import { env } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
const API_URL = env.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // API: GET
  public get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.httpClient
      .get(API_URL + path, { params })
      .pipe(catchError(this.formatErrors));
  }

  // API: POST
  public post(path: string, body: {}): Observable<any> {
    return this.httpClient
      .post(API_URL + path, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }
}
