import { Alert, AlertIcon, Button, Center, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom'
import { login } from '../redux/auth/actions'

function FormLogin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // @ts-ignore
  const { user, error, isLoading } = useSelector((state) => state.auth)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const updateField = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    })
  }

  useEffect(() => {
    if (user) {
      if (user.type === 'vendor') {
        navigate('/vendordash')
      } else {
        navigate('/')
      }
    }
  }, [user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    // @ts-ignore
    dispatch(login(form))
  }
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert status="error">
          <AlertIcon /> {error}
        </Alert>
      )}
      <FormControl my="5">
        <Input
          variant="flushed"
          placeholder="email address"
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
        />
      </FormControl>
      <FormControl my="5">
        <Input
          variant="flushed"
          placeholder="password"
          id="password"
          type="password"
          required
          value={form.password}
          onChange={(e) => updateField('password', e.target.value)}
        />
      </FormControl>
      <Center>
        <Text my="5">
          Not a member yet?{'  '}
          <Link as={RouterLink} to="/register">
            Register Here
          </Link>
        </Text>
      </Center>
      <Center>
        <Button type="submit" isLoading={isLoading} colorScheme="orange">
          Login
        </Button>
      </Center>
    </form>
  )
}

export default FormLogin
