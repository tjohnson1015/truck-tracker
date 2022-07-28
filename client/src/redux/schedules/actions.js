export const GET_SCHEDULES = 'schedules/GET_SCHEDULES'
export const SET_SCHEDULES = 'schedules/SET_SCHEDULES'
export const SET_ERROR = 'schedules/SET_ERROR'
export const CREATE_SCHEDULE = 'schedules/CREATE_SCHEDULE'
export const DELETE_SCHEDULE = 'schedules/DELETE_SCHEDULE'
export const SET_PUBLIC_SCHEDULES = 'schedules/SET_PUBLIC_SCHEDULES'
export const SET_ALL_PUBLIC_SCHEDULES = 'schedules/SET_ALL_PUBLIC_SCHEDULES'

export const getSchedules = () => {
  return (dispatch) => {
    fetch('/api/v1/schedules')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch({ type: SET_SCHEDULES, schedules: [] })
        } else {
          dispatch({ type: SET_SCHEDULES, schedules: data })
        }
      })
  }
}

export const getPublicSchedules = () => {
  return (dispatch) => {
    fetch('/api/v1/schedules/public')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch({ type: SET_PUBLIC_SCHEDULES, schedules: [] })
        } else {
          dispatch({ type: SET_PUBLIC_SCHEDULES, schedules: data })
        }
      })
  }
}

export const getAllPublicSchedules = () => {
  return (dispatch) => {
    fetch('/api/v1/schedules/public?show=all')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch({ type: SET_ALL_PUBLIC_SCHEDULES, allSchedules: [] })
        } else {
          dispatch({ type: SET_ALL_PUBLIC_SCHEDULES, allSchedules: data })
        }
      })
  }
}

export const createSchedule = (schedule) => {
  return (dispatch) => {
    dispatch({ type: CREATE_SCHEDULE })
    apiFetch('/api/v1/schedules', 'POST', schedule).then((data) => {
      if (data.error) {
        dispatch({ type: SET_ERROR, error: data.error })
      } else {
        dispatch(getSchedules())
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
