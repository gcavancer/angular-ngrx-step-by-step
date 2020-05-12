import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../services/employee.service";
import { Observable } from "rxjs";
import { Employee } from "../../models/employee";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  errorMessage: string;
  employees$: Observable<Employee[]>;

  constructor(private service: EmployeeService) {}

  ngOnInit(): void {
    this.employees$ = this.getEmployees();
  }

  getEmployees(): Observable<Employee[]> {
    return this.service.getEmployees();
  }

  deleteEmployeeById(id: number): void {
    this.service.deleteEmployeeById(id).subscribe(() => {
      this.employees$ = this.getEmployees();
    });
    
  }
}
