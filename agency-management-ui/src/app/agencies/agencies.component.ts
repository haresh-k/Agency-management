import { Component, OnInit } from '@angular/core';

import { Agency } from '../agency';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css']
})
export class AgenciesComponent implements OnInit {

  agencies: Agency[] = [];
  constructor(private agencyService: AgencyService) { }

  ngOnInit(): void {
    this.getAgencies();
  }

  getAgencies(): void {
      this.agencyService.getAgencies()
          .subscribe(agencies => this.agencies = agencies);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.agencyService.addAgency({ name } as Agency)
      .subscribe(agency => {
        this.agencies.push(agency);
      });
  }

  delete(agency: Agency): void {
    this.agencies = this.agencies.filter(h => h !== agency);
    this.agencyService.deleteAgency(agency.id).subscribe();
  }
}
