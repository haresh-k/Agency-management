import { Component, OnInit, Input } from '@angular/core';
import { Agency } from '../agency'

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AgencyService } from '../agency.service'

@Component({
  selector: 'app-agency-detail',
  templateUrl: './agency-detail.component.html',
  styleUrls: ['./agency-detail.component.css']
})
export class AgencyDetailComponent implements OnInit {
  agency: Agency | undefined;

  constructor(
    private route: ActivatedRoute,
    private agencyService: AgencyService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAgency();
  }

  getAgency(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.agencyService.getAgency(id)
      .subscribe(agency => this.agency = agency);
  }

  goBack(): void {
      this.location.back();
  }

  save(): void {
    if (this.agency) {
      this.agencyService.updateAgency(this.agency)
        .subscribe(() => this.goBack());
    }
  }
}
