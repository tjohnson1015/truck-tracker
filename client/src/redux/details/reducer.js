import { CREATE_DETAIL, DELETE_DETAIL, GET_DETAILS, SET_DETAILS, SET_ERROR, SET_PUBLIC_DETAILS } from './actions'

const defaultState = {
  items: null,
  isLoading: false,
  isError: false,
  error: null,
  publicItems: [],
}

export const detailsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      }
    case SET_DETAILS:
      return {
        ...state,
        items: action.details,
        isLoading: false,
      }
    case SET_PUBLIC_DETAILS:
      return {
        ...state,
        publicItems: action.details,
        isLoading: false,
      }
    case SET_ERROR:
      return {
        ...state,
        isError: true,
        error: action.error,
      }
    case CREATE_DETAIL:
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      }
    case DELETE_DETAIL:
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
