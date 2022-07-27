import { Alert, AlertIcon, Button, Center, FormControl, FormLabel, Input, Link, Select, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

function FormRegister() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    type: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const updateField = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')
    fetch('/api/v1/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false)
        if (data.error) {
          setError(data.error)
        } else {
          setSuccess('Registered Successfully')
        }
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert status="error">
          <AlertIcon /> {error}
        </Alert>
      )}
      {success && (
        <Alert status="success">
          <AlertIcon /> {success}
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
      <FormControl my="5">
        <Select
          required
          placeholder="What describes you best?"
          variant="flushed"
          value={form.type}
          onChange={(e) => updateField('type', e.target.value)}
        >
          <option value="user">Looking for delicious food</option>
          <option value="vendor">Serving delicious food</option>
        </Select>
      </FormControl>
      <Center>
        <Text my="5">
          Already a member?{'  '}
          <Link as={RouterLink} to="/login">
            Login Here
          </Link>
        </Text>
      </Center>
      <Center>
        <Button type="submit" isLoading={isLoading} colorScheme="orange">
          Register
        </Button>
      </Center>
    </form>
  )
}

export default FormRegister
