import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Agency } from '../agency';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'app-agency-search',
  templateUrl: './agency-search.component.html',
  styleUrls: [ './agency-search.component.css' ]
})
export class AgencySearchComponent implements OnInit {
  agencies$!: Observable<Agency[]>;
  private searchTerms = new Subject<string>();

  constructor(private agencyService: AgencyService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.agencies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.agencyService.searchAgencies(term)),
    );
  }
}
