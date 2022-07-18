import { Component, OnInit } from '@angular/core';
import { Agency } from '../agency';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  agencies: Agency[] = [];

  constructor(private agencyService: AgencyService) { }

  ngOnInit(): void {
    this.getAgencies();
  }

  getAgencies(): void {
    this.agencyService.getAgencies()
      .subscribe(agencies => this.agencies = agencies.slice(1, 5));
  }
}
