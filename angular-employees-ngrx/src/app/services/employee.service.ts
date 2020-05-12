import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, delay } from "rxjs/operators";
import { Employee } from "../models/employee";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  private API_BASE_URL = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.API_BASE_URL}/employees`).pipe(
      delay(100),
      catchError(this.handleError)
    );
  }

  deleteEmployeeById(id: number) {
    return this.http.delete(`${this.API_BASE_URL}/employees/${id}`).pipe(
      delay(100)
    )
  }

  handleError(error: any) {
    let errorMessage = '';
    // Client-side error.
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    // Server-side error.
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
 
}