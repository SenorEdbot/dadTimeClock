import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as models from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'https://alex-and-eddie-server.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<models.EmployeeResponse[]> {
    return this.http.get<models.EmployeeResponse[]>(`${this.baseUrl}/employee`);
  }

  saveEmployee(employee: models.Employee): Observable<models.EmployeeResponse> {
    return this.http.post<models.EmployeeResponse>(`${this.baseUrl}/employee`, employee);
  }
}
