import {
  CREATE_SCHEDULE,
  DELETE_SCHEDULE,
  GET_SCHEDULES,
  SET_ERROR,
  SET_PUBLIC_SCHEDULES,
  SET_SCHEDULES,
} from './actions'

const defaultState = {
  items: [],
  isLoading: false,
  isError: false,
  error: null,
  publicItems: [],
}

export const schedulesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_SCHEDULES:
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      }
    case SET_SCHEDULES:
      return {
        ...state,
        items: action.schedules,
        isLoading: false,
      }
    case SET_PUBLIC_SCHEDULES:
      return {
        ...state,
        publicItems: action.schedules,
        isLoading: false,
      }
    case SET_ERROR:
      return {
        ...state,
        isError: true,
        error: action.error,
      }
    case CREATE_SCHEDULE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      }
    case DELETE_SCHEDULE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      }
    default:
      return state
  }
}
