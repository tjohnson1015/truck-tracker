import { Box, Center, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import FormLogin from '../components/FormLogin'
import Logo from '../images/logo.png'

function Login() {
  return (
    <>
      <Center>
        <Box w="100%" maxW="800px" bg="white" p={5} borderRadius="25px" mt={10}>
          <Flex>
            <Box w="55%">
              <Image src={Logo} alt="logo" />
            </Box>
            <Box w="45%">
              <Box px={4} mt={10} textAlign="center" fontSize="3xl">
                Login
              </Box>
              <Box my={10} mx="auto">
                <FormLogin />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
  )
}

export default Login
