import { Injectable } from '@angular/core';
import { Tip } from '../../interfaces/tip';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LogService } from 'src/app/log/services/log.service';

@Injectable({
  providedIn: 'root',
})
export class TipService {
  private tipsUrl = 'api/tips';

  constructor(private http: HttpClient, private logService: LogService) {}

  getTips(audience: string): Observable<Tip[]> {
    const url = `${this.tipsUrl}_${audience}`;
    return this.http.get<Tip[]>(url).pipe(
      tap((_) => this.log('fetched tips')),
      catchError(this.handleError<Tip[]>('getTips', []))
    );
  }

  getTip(id: number, audience: string): Observable<Tip> {
    const url = `${this.tipsUrl}_${audience}/${id}`;
    return this.http.get<Tip>(url).pipe(
      tap((_) => this.log(`fetched tip id=${id}`)),
      catchError(this.handleError<Tip>(`getTip id=${id}`))
    );
  }

  private handleError<T>(
    operation = 'operation',
    result?: T
  ): (err: any, caught: Observable<T>) => import('rxjs').ObservableInput<any> {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.logService.add(`TipService: ${message}`);
  }
}
