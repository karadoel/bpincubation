import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PitchSimulatorRoutingModule } from './pitch-simulator-routing.module';
import { InvestorsComponent } from './investors/investors.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { QuestionComponent } from './question/question.component';
import { LogModule } from '../log/log.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data/in-memory-data.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent, InvestorsComponent, QuestionComponent],
  imports: [
    CommonModule,
    PitchSimulatorRoutingModule,
    LogModule,
    MatButtonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule,
  ],
  exports: [],
})
export class PitchSimulatorModule {}
