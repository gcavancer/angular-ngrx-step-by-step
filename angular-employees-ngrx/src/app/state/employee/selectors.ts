import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, employeeFeatureKey } from './reducer';

const getEmployeeState = createFeatureSelector<State>(
  employeeFeatureKey
);

export const selectEmployeeList = createSelector(
  getEmployeeState,
  state => state.employees
);

export const selectEmployeeError = createSelector(
  getEmployeeState,
  state => state.error
);

export const selectEmployeeIsLoading = createSelector(
  getEmployeeState,
  state => state.isLoading
);