import { Injectable } from '@angular/core';
import { Poem } from './poem/poem.model';
import { Observable, Subject, of, interval } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoemDataService {
  constructor(private http: HttpClient) {}
  loadingError$ = new Subject<string>();

  addNewPoem(poem: Poem) {
    return this.http.post(`${environment.apiUrl}/poems/`, poem.toJSON());
  }

  addVote(idPoem: number, author: string, vote: number) {
    return this.http.put(
      `${environment.apiUrl}/extras?id=${idPoem}&author=${author}&vote=${vote}`,
      {}
    );
  }

  deleteVote(idPoem: number, author: string, vote: number) {
    return this.http.delete(
      `${environment.apiUrl}/extras?id=${idPoem}&author=${author}&vote=${vote}`,
      {}
    );
  }

  modifyPoem(poem: Poem) {
    return this.http.put(
      `${environment.apiUrl}/poems/` + poem.id,
      poem.toJSON()
    );
  }

  deletePoem(poem: Poem) {
    return this.http.delete(
      `${environment.apiUrl}/poems/` + poem.id,
      poem.toJSON()
    );
  }

  get poems$(): Observable<Poem[]> {
    return this.http.get(`${environment.apiUrl}/poems/`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }),
      map(
        (list: any[]): Poem[] => {
          return list.map(Poem.fromJSON);
        }
      )
    );
  }

  getMyPoems$(author): Observable<Poem[]> {
    return this.http.get(`${environment.apiUrl}/poems?author=` + author).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }),
      map(
        (list: any[]): Poem[] => {
          if (list.length == 0) {
            this.loadingError$.next('You have no poems yet !');
            return null;
          }
          return list.map(Poem.fromJSON);
        }
      )
    );
  }
}
