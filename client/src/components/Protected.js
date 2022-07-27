import React, { useEffect } from 'react'
import { Navigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { checkUser } from '../redux/auth/actions'

function Protected({ children }) {
  const dispatch = useDispatch()
  // @ts-ignore
  const { user, isChecked, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    // @ts-ignore
    dispatch(checkUser())
  }, [dispatch])

  // checking
  if (!isChecked || isLoading) {
    return null
  }

  // checked & not logged in
  if (isChecked && !user) {
    return <Navigate to="/login" replace />
  }

  // checked & logged in
  return children
}

export default Protected
