import { Actions, ActionTypes } from './actions';
import { Employee } from '../../models/employee';

export interface State {
  employees: Employee[];
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  employees: [],
  isLoading: false,
  error: ''
};

export const employeeFeatureKey = 'employee';

export function employeeFeatureReducer(state = initialState, action: Actions): State {

  switch (action.type) {
    case ActionTypes.LOAD_EMPLOYEES_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_EMPLOYEES_SUCCESS: {
      return {
        employees: action.payload.employees,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.LOAD_EMPLOYEES_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.DELETE_EMPLOYEE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.DELETE_EMPLOYEE_SUCCESS: {
      return Object.assign({}, state, { 
        employees: state.employees.filter(({ id }) => id !== action.payload),
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.DELETE_EMPLOYEE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}