import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/pitch-simulator', pathMatch: 'full' },
  {
    path: 'pitch-simulator',
    loadChildren: () =>
      import('./pitch-simulator/pitch-simulator.module').then(
        (m) => m.PitchSimulatorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
