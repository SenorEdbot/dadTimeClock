import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule} from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeeklyViewComponent } from './components/weekly-view/weekly-view.component';
import { OverviewComponent } from './components/overview/overview.component';
import { DayComponent } from './components/day/day.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SelectEmployeeComponent } from './components/select-employee/select-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeService } from './services/employee.service';
import { EmployeeState } from './state/employee.state';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WeeklyViewComponent,
    OverviewComponent,
    DayComponent,
    NavBarComponent,
    SelectEmployeeComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([EmployeeState])
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
