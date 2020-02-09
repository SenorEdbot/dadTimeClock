import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import * as models from '../models';
import * as actions from './employee.actions';
import { EmployeeService } from '../services/employee.service';

export interface EmployeeStateModel {
  employees: models.EmployeeResponse[];
}

const defaults: EmployeeStateModel = {
  employees: null
};

@State<EmployeeStateModel>({
  name: 'employee',
  defaults
})
export class EmployeeState {
  constructor(
    private employeeService: EmployeeService,
    private store: Store
  ) {}

  @Selector()
  static employees(state: EmployeeStateModel) { return state.employees; }

  @Action(actions.LoadEmployees)
  loadEmployees(
    { patchState }: StateContext<EmployeeStateModel>
  ) {
    return this.employeeService.getEmployees().pipe(
      tap((employees: models.EmployeeResponse[]) => {
        patchState({
          employees
        });
      })
    );
  }

  @Action(actions.SaveEmployee)
  saveEmployee(
    { dispatch }: StateContext<EmployeeStateModel>,
    { employee }: actions.SaveEmployee
  ) {
    return this.employeeService.saveEmployee(employee).pipe(
      tap(() => {
        dispatch(new actions.LoadEmployees());
      })
    );
  }
}

