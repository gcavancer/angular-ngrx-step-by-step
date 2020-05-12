import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Employee } from "../../models/employee";

import {
  EmployeeStoreState,
  EmployeeStoreActions,
  EmployeeStoreSelectors
} from "../../state/employee";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  error: string;
  isLoading$: Observable<boolean>;
  employees$: Observable<Employee[]>;

  constructor(private store$: Store<EmployeeStoreState.State>) {}

  ngOnInit(): void {
    this.employees$ = this.store$.select(
      EmployeeStoreSelectors.selectEmployeeList
    );

    this.store$.select(
      EmployeeStoreSelectors.selectEmployeeError
    ).subscribe(data => {
      this.error = data
    });

    this.isLoading$ = this.store$.select(
      EmployeeStoreSelectors.selectEmployeeIsLoading
    );

    this.store$.dispatch(new EmployeeStoreActions.LoadEmployeesRequestAction());
  }

  getEmployees() {
    this.store$.dispatch(new EmployeeStoreActions.LoadEmployeesRequestAction());

    this.store$.select(
      EmployeeStoreSelectors.selectEmployeeError
    ).subscribe(data => {
      this.error = data
    });
  }

  deleteEmployeeById(id: number): void {
    this.store$.dispatch(
      new EmployeeStoreActions.DeleteEmployeeRequestAction(id)
    );
  }
}
