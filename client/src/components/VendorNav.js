import { Box, Button, Flex, Image, Link } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { checkUser, logout } from '../redux/auth/actions'
import LogoWord from '../images/logoword.png'

const VendorNav = () => {
  // @ts-ignore
  const { user, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(checkUser())
  }, [dispatch])

  return (
    <Flex
      backgroundColor="gray.50"
      borderRadius={0}
      p={2}
      m={0}
      justifyContent="space-between"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="md"
      h="85px"
    >
      <Box background="" h="75px" minWidth="100px" pt={0}>
        <Link as={RouterLink} to="/" fontSize="lg" fontWeight="semibold">
          <Image src={LogoWord} alt="logo" />
        </Link>
      </Box>
      {!isLoading && (
        <Flex justifyContent="flex-end" gap={6} p={5}>
          {user ? (
            <>
              <Link as={RouterLink} to="/">
                Map
              </Link>
              <Link as={RouterLink} to="/vendorschedule">
                Your Schedule
              </Link>
              <Link as={RouterLink} to="/vendortruck">
                Your Truck
              </Link>
              <Link as={RouterLink} to="/events">
                Events
              </Link>
              <Link
                onClick={() =>
                  dispatch(
                    // @ts-ignore
                    logout()
                  )
                }
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link as={RouterLink} to="/login">
                Login
              </Link>
              <Link as={RouterLink} to="/register">
                Register
              </Link>
            </>
          )}
        </Flex>
      )}
    </Flex>
  )
}

export default VendorNav
