import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Agency } from './agency';
//import { AGENCIES } from './mock-agencies';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {

  private agencyUrl = 'http://localhost:8080/v1/agency';
  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'})
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getAgencies(): Observable<Agency[]> {
    /*const agencies = of(AGENCIES);
    this.messageService.add('AgencyService: fetched agencies');
    return agencies;*/
    return this.http.get<Agency[]>(this.agencyUrl)
          .pipe(
            tap(_ => this.log('fetched agencies')),
            catchError(this.handleError<Agency[]>('getAgencies', []))
          )
  }

  getAgencyNo404<Data>(id: string): Observable<Agency> {
    const url = `${this.agencyUrl}/?id=${id}`;
    return this.http.get<Agency[]>(url)
      .pipe(
        map(agencies => agencies[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} agency id=${id}`);
        }),
        catchError(this.handleError<Agency>(`getAgency id=${id}`))
      );
  }

  getAgency(id: string): Observable<Agency> {
      // For now, assume that a agency with the specified `id` always exists.
      // Error handling will be added in the next step of the tutorial.
      /*const agency = AGENCIES.find(h => h.id === id)!;
      this.messageService.add(`AgencyService: fetched agency id=${id}`);
      return of(agency);*/
      const url = `${this.agencyUrl}/${id}`;
      return this.http.get<Agency>(url).pipe(
        tap(_ => this.log(`fetched agency id=${id}`)),
        catchError(this.handleError<Agency>(`getAgency id=${id}`))
      );
  }

  addAgency(agency: Agency): Observable<Agency> {
    return this.http.post<Agency>(this.agencyUrl, agency, this.httpOptions).pipe(
      tap((newAgency: Agency) => this.log(`added agency w/ id=${newAgency.id}`)),
      catchError(this.handleError<Agency>('addAgency'))
    );
  }

  updateAgency(agency: Agency): Observable<any> {
    console.log(agency);
    const url = `${this.agencyUrl}/${agency.id}`;
    return this.http.put(url, agency, this.httpOptions).pipe(
      tap(_ => this.log(`updated agency id=${agency.id}`)),
      catchError(this.handleError<any>('updateAgency'))
    );
  }

  deleteAgency(id: number): Observable<Agency> {
    const url = `${this.agencyUrl}/${id}`;

    return this.http.delete<Agency>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted agency id=${id}`)),
      catchError(this.handleError<Agency>('deleteAgency'))
    );
  }

  searchAgencies(term: string): Observable<Agency[]> {
    if (!term.trim()) {
      // if not search term, return empty agency array.
      return of([]);
    }
    return this.http.get<Agency[]>(`${this.agencyUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found agencies matching "${term}"`) :
         this.log(`no agencies matching "${term}"`)),
      catchError(this.handleError<Agency[]>('searchAgencies', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a AgencyService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AgencyService: ${message}`);
  }
}
