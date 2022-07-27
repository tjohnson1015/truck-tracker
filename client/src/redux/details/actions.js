export const GET_DETAILS = 'details/GET_DETAILS'
export const SET_DETAILS = 'details/SET_DETAILS'
export const SET_ERROR = 'details/SET_ERROR'
export const CREATE_DETAIL = 'details/CREATE_DETAIL'
export const DELETE_DETAIL = 'details/DELETE_DETAIL'
export const SET_PUBLIC_DETAILS = 'details/SET_PUBLIC_DETAILS'

export const getDetails = () => {
  return (dispatch) => {
    fetch('/api/v1/details')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch({ type: SET_DETAILS, details: [] })
        } else {
          dispatch({ type: SET_DETAILS, details: data })
        }
      })
  }
}

export const getPublicDetails = () => {
  return (dispatch) => {
    fetch('/api/v1/details/public')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch({ type: SET_PUBLIC_DETAILS, details: [] })
        } else {
          dispatch({ type: SET_PUBLIC_DETAILS, details: data })
        }
      })
  }
}

export const createDetail = (detail) => {
  return (dispatch) => {
    dispatch({ type: CREATE_DETAIL })
    apiFetch('/api/v1/details', 'POST', detail).then((data) => {
      if (data.error) {
        dispatch({ type: SET_ERROR, error: data.error })
      } else {
        dispatch(getDetails())
      }
    })
  }
}

// export const deleteSchedule = (id) => {
//   return (dispatch) => {
//     dispatch({ type: UPDATE_SCHEDULE })
//     apiFetch(`/api/v1/schedules/${id}`, 'DELETE').then((data) => {
//       if (data.error) {
//         dispatch({ type: SET_ERROR, error: data.error })
//       } else {
//         dispatch(getSchedules())
//       }
//     })
//   }
// }

const apiFetch = (url, method = 'GET', body = null) => {
  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  }).then((res) => res.json())
}
