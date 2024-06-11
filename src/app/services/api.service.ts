import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, retry, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://localhost/SRSP-back';
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.apiURL}/${url}`).pipe(
      delay(300),
      retry({
        count: 10,
        delay: 2000
      }),
      map(data => data),
      tap(_ => this.errorHandler)
    )
  }

  getByInfo<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.apiURL}/${url}`).pipe(
      delay(300),
      tap(_ => this.errorHandler)
    )
  }

  post<T>(url: string, params: T): Observable<T> {
    return this.http.post<T>(`${this.apiURL}/${url}`, params, this.options).pipe(
      delay(400),
      tap(_ => this.errorHandler)
    )
  }

  put<T>(url: string, params: T): Observable<T> {
    return this.http.put<T>(`${this.apiURL}/${url}`, params, this.options).pipe(
      retry({
        count: 5,
        delay: 30000
      }),
      tap(_ => this.errorHandler)
    )
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.apiURL}/${url}`).pipe(
      retry({
        count: 5,
        delay: 20000
      }),
      tap(_ => this.errorHandler)
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.log(error.error);
    } else {
      console.log(`Backend status: ${error.status} ${error.statusText}`, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}