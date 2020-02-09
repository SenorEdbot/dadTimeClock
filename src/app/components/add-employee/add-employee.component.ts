import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  @Output() saveEmployeeEvent = new EventEmitter();
  newEmpForm: FormGroup;
  numberOfHours: number[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.numberOfHours = [...Array(12).keys()];
    this.newEmpForm = this.fb.group({
      firstName: '',
      middleInitial: '',
      lastName: '',
      generalStartHour: ''
    });
  }

  saveEmployee() {
    this.saveEmployeeEvent.emit(this.newEmpForm.value);
  }

}
