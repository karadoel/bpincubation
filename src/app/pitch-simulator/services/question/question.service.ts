import { Injectable } from '@angular/core';
import { Question } from '../../interfaces/question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LogService } from 'src/app/log/services/log.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questionsUrl = 'api/questions';

  constructor(private http: HttpClient, private logService: LogService) {}

  getQuestions(audience: string): Observable<Question[]> {
    const url = `${this.questionsUrl}_${audience}`;
    return this.http.get<Question[]>(url).pipe(
      tap((_) => this.log('fetched questions')),
      catchError(this.handleError<Question[]>('getQuestions', []))
    );
  }

  getQuestion(id: number, audience: string): Observable<Question> {
    const url = `${this.questionsUrl}_${audience}/${id}`;
    return this.http.get<Question>(url).pipe(
      tap((_) => this.log(`fetched question id=${id}`)),
      catchError(this.handleError<Question>(`getQuestion id=${id}`))
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
    this.logService.add(`QuestionService: ${message}`);
  }
}
