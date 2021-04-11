import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, share, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Api } from '../../models/api';
import { LocalNotificationService } from '../../../shared/services/local-notification.service';

@Injectable({
  providedIn: 'root',
})
export class GetXhrService {
  api: Api;

  constructor(
    private httpclient: HttpClient,
    private notifyService: LocalNotificationService
  ) {}

  getData(ApiName, params?, Log?): Observable<any> {
    return this.httpclient
      .get<Api>(environment.APIbaseURL + ApiName, {})
      .pipe(share())
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res: any) => {
          if (res) {
            this.notifyService.showSuccess(
              'Data shown successfully !!',
              'Almoasher-Task'
            );
          }
        }),

        catchError(this.handleError<Api>('get' + ApiName)),
        shareReplay(1)
      );
  }

  postData(ApiName, params, Log?): Observable<any> {
    return this.httpclient
      .post<Api>(environment.APIbaseURL + ApiName, params)
      .pipe(share())
      .pipe(
        map((res: any) => {
          return res;
        }),
        tap((res: any) => {
          this.notifyService.showSuccess(
            'Data shown successfully !!',
            'Almoasher-Task'
          );

          if (this.api) {
          } else {
          }
        }),

        catchError(this.handleError<Api>('post' + ApiName))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      this.notifyService.showError('Something is wrong', 'Almoasher-Task');

      // TODO: better job of transforming error for user consumption
      //   this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(null);
    };
  }
}
