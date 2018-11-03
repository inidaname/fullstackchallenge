import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../routes/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  user(data): Observable<User> {
    return this.http.post<User>(environment.api + '/register', data).pipe(
      tap(res => JSON.stringify(res)),
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
    return throwError(errorMessage);
}

}
