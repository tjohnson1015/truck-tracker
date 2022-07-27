import { CHECK_USER, SET_ERROR, USER_LOGGED_IN, USER_LOGGED_OUT } from './actions'

const defaultState = {
  user: null,
  isChecked: false,
  isLoading: false,
  error: null,
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHECK_USER:
      return {
        ...state,
        user: null,
        isLoading: true,
      }
    case SET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case USER_LOGGED_IN:
      return {
        ...state,
        user: action.user,
        isChecked: true,
        isLoading: false,
      }
    case USER_LOGGED_OUT:
      return {
        ...state,
        user: null,
        isChecked: true,
        isLoading: false,
      }
    default:
      return state
  }
}
