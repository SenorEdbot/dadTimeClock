import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';
import { OverviewComponent } from './overview/overview.component';


const routes: Routes = [
  {
    path: '',
    component: WeeklyViewComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
