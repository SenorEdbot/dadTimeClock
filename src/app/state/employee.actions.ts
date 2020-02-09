import { Employee } from '../models';

export class LoadEmployees {
  static type = '[Employee] LoadEmployees';
}

export class SaveEmployee {
  static type = '[Employee] SaveEmployee';
  constructor(public employee: Employee) {}
}
