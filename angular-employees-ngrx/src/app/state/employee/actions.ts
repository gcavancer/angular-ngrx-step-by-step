import { Action } from "@ngrx/store";
import { Employee } from "../../models/employee";

export enum ActionTypes {
  LOAD_EMPLOYEES_REQUEST = "[Employees] Load Request",
  LOAD_EMPLOYEES_FAILURE = "[Employees] Load Failure",
  LOAD_EMPLOYEES_SUCCESS = "[Employees] Load Success",
  DELETE_EMPLOYEE_REQUEST = "[Employee] Delete Request",
  DELETE_EMPLOYEE_FAILURE = "[Employee] Delete Failure",
  DELETE_EMPLOYEE_SUCCESS = "[Employee] Delete Success"
}

export class LoadEmployeesRequestAction implements Action {
  readonly type = ActionTypes.LOAD_EMPLOYEES_REQUEST;
}

export class LoadEmployeesFailureAction implements Action {
  readonly type = ActionTypes.LOAD_EMPLOYEES_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadEmployeesSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_EMPLOYEES_SUCCESS;
  constructor(public payload: { employees: Employee[] }) {}
}

export class DeleteEmployeeRequestAction implements Action {
  readonly type = ActionTypes.DELETE_EMPLOYEE_REQUEST;
  constructor(public payload: number) {}
}

export class DeleteEmployeeFailureAction implements Action {
  readonly type = ActionTypes.DELETE_EMPLOYEE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class DeleteEmployeeSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_EMPLOYEE_SUCCESS;
  constructor(public payload: number) {}
}

export type Actions =
  | LoadEmployeesRequestAction
  | LoadEmployeesFailureAction
  | LoadEmployeesSuccessAction
  | DeleteEmployeeRequestAction
  | DeleteEmployeeFailureAction
  | DeleteEmployeeSuccessAction;
