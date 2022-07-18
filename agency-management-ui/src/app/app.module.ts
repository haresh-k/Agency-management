import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgenciesComponent } from './agencies/agencies.component';
import { AgencyDetailComponent } from './agency-detail/agency-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgencySearchComponent } from './agency-search/agency-search.component';

@NgModule({
  declarations: [
    AppComponent,
    AgenciesComponent,
    AgencyDetailComponent,
    MessagesComponent,
    DashboardComponent,
    AgencySearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
