import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import VendorNav from '../components/VendorNav'

function VendorDash() {
  const { user, error, isLoading } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      if (user.type !== 'vendor') {
        navigate('/')
      }
    }
  }, [user, navigate])

  return <></>
}

export default VendorDash
