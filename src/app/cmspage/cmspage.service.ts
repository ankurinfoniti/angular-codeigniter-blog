import { Injectable } from '@angular/core';
import { Page } from './page';
import { Contact } from './contact';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmspageService {

  serverUrl = 'http://localhost/ci-php-webapi/index.php/';
  errorData: {};

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getPage(slug: string) {
    return this.http.get<Page>(this.serverUrl + 'api/page/' + slug)
      .pipe(
        catchError(this.handleError)
      );
  }

  contactForm(formdata: Contact) {
    return this.http.post<Contact>(this.serverUrl + 'api/contact/', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}