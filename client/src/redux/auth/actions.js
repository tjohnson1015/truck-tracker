export const USER_LOGGED_IN = 'user/USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'user/USER_LOGGED_OUT'
export const CHECK_USER = 'user/CHECK_USER'
export const SET_ERROR = 'user/SET_ERROR'

export const login = (userDetails) => {
  return (dispatch) => {
    fetch('/api/v1/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch({ type: SET_ERROR, error: data.error })
        } else {
          dispatch(checkUser())
        }
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    fetch('/api/v1/users/logout')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: USER_LOGGED_OUT })
      })
  }
}

export const checkUser = () => {
  return (dispatch, getState) => {
    // only check for user once
    const { isChecked, user } = getState().auth
    if (isChecked && user) return

    dispatch({ type: CHECK_USER })
    fetch('/api/v1/users/current')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          dispatch({ type: USER_LOGGED_IN, user: data })
        } else {
          dispatch({ type: USER_LOGGED_OUT })
        }
      })
      .catch(() => {
        dispatch({ type: USER_LOGGED_OUT })
      })
  }
}
