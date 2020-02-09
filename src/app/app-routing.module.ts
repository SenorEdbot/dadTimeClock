import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeeklyViewComponent } from './components/weekly-view/weekly-view.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';


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
    path: 'employee/add',
    component: AddEmployeeComponent
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
