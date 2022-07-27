export const TOGGLE_FAVORITE = 'favorites/TOGGLE_FAVORITE'
export const SET_ERROR = 'favorites/SET_ERROR'
export const SET_FAVORITES = 'favorites/SET_FAVORITES'
export const GET_FAVORITES = 'favorites/GET_FAVORITES'

export const toggleFavorite = (favorite) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_FAVORITE })
    apiFetch(`/api/v1/favorites/${favorite}`, 'POST').then((data) => {
      if (data.error) {
        dispatch({ type: SET_ERROR, error: data.error })
      } else {
        dispatch(getFavorites())
      }
    })
  }
}

export const getFavorites = () => {
  return (dispatch) => {
    dispatch({ type: GET_FAVORITES })
    fetch('/api/v1/favorites')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch({ type: SET_FAVORITES, favorites: [] })
        } else {
          dispatch({ type: SET_FAVORITES, favorites: data })
        }
      })
  }
}

const apiFetch = (url, method = 'GET', body = null) => {
  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  }).then((res) => res.json())
}
