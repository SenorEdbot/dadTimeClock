import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as actions from '../../state/employee.actions';
import * as models from '../../models';
import { Employee } from '../../models/Employee';
import { EmployeeState } from '../../state/employee.state';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';


@Component({
  selector: 'app-select-employee',
  templateUrl: './select-employee.component.html',
  styleUrls: ['./select-employee.component.scss']
})
export class SelectEmployeeComponent implements OnInit {
  @Select(EmployeeState.employees) employees$: Observable<models.EmployeeResponse[]>;
  @ViewChild('addEmployee', {static: false}) addEmployeeComponent: AddEmployeeComponent;
  displayAddEmp: boolean;
  selectEmpForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private store: Store
    ) { }

  ngOnInit() {
    this.store.dispatch(new actions.LoadEmployees());
    this.displayAddEmp = false;
    this.selectEmpForm = this.fb.group({
      selectedEmployeeFname: ''
    });
  }

  toggleAddEmployee() {
    this.displayAddEmp = !this.displayAddEmp;
  }

  saveNewEmployee(event: Employee) {
    this.store.dispatch(new actions.SaveEmployee(event));
    this.addEmployeeComponent.newEmpForm.reset({
      firstName: '',
      middleInitial: '',
      lastName: '',
      generalStartHour: ''
    });
    this.displayAddEmp = !this.displayAddEmp;
  }

  // employeeSelected(firstName: string): void {
  //   this.employees$.pipe(

  //   )
  // }

}
