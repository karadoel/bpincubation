import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InvestorsComponent } from './investors/investors.component';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'investors', redirectTo: 'question/investors/1', pathMatch: 'full' },
  { path: 'customers', redirectTo: 'question/customers/1', pathMatch: 'full' },
  { path: 'question/:audience/:id', component: QuestionComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PitchSimulatorRoutingModule {}
