import { GET_FAVORITES, SET_ERROR, SET_FAVORITES, TOGGLE_FAVORITE } from './actions'

const defaultState = {
  items: [],
  isLoading: false,
  isError: false,
  error: null,
}

export const favoritesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      }
    case GET_FAVORITES:
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      }
    case SET_FAVORITES:
      return {
        ...state,
        items: action.favorites,
        isLoading: false,
      }

    case SET_ERROR:
      return {
        ...state,
        isError: true,
        error: action.error,
      }

    default:
      return state
  }
}
