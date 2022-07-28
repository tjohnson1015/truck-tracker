import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HomeMap from '../components/HomeMap'
import VendorNav from '../components/VendorNav'

function VendorDash() {
  // @ts-ignore
  const { user, error, isLoading } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      if (user.type !== 'vendor') {
        navigate('/')
      }
    }
  }, [user, navigate])

  return (
    <>
      <HomeMap />
    </>
  )
}

export default VendorDash
