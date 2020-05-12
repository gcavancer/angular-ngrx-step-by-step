import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, mergeMap } from "rxjs/operators";
import { EmployeeService } from "../../services/employee.service";
import * as featureActions from "./actions";

@Injectable()
export class EmployeeStoreEffects {
  constructor(
    private employeeService: EmployeeService,
    private actions$: Actions
  ) {}

  @Effect()
  deleteRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.DeleteEmployeeRequestAction>(
      featureActions.ActionTypes.DELETE_EMPLOYEE_REQUEST
    ),
    map((action: featureActions.DeleteEmployeeRequestAction) => action.payload),
    mergeMap((id: number) =>
      this.employeeService.deleteEmployeeById(id).pipe(
        map(employees => new featureActions.DeleteEmployeeSuccessAction(id)),
        catchError(error =>
          observableOf(
            new featureActions.DeleteEmployeeFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadEmployeesRequestAction>(
      featureActions.ActionTypes.LOAD_EMPLOYEES_REQUEST
    ),
    startWith(new featureActions.LoadEmployeesRequestAction()),
    mergeMap(action =>
      this.employeeService.getEmployees().pipe(
        map(
          employees =>
            new featureActions.LoadEmployeesSuccessAction({
              employees
            })
        ),
        catchError(error =>
          observableOf(new featureActions.LoadEmployeesFailureAction({ error }))
        )
      )
    )
  );
}
