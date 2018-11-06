import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../routes/login/login.component';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  logUserIn(login): Observable<User> {
    return this.http.post<User>(environment.api + '/login', login).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
          // A client-side or network error
          errorMessage = `An error occored: ${err.error.message}`;
      } else {
          // backend return error
          errorMessage = `Server retuened code: ${err.status} and message ${err.message}`;
      }

      console.log(errorMessage);
      return throwError({errorMessage, err});
  }

}
