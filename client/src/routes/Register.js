import { Box, Center, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import FormRegister from '../components/FormRegister'
import Logo from '../images/logo.png'
import RegText from '../images/register.png'

function Register() {
  return (
    <>
      <Center>
        <Box w="100%" maxW="800px" bg="white" p={5} borderRadius="25px" mt={10}>
          <Flex>
            <Box w="55%">
              <Image src={Logo} alt="logo" />
            </Box>
            <Box w="45%">
              <Text px={4} mt={10} textAlign="center" fontSize="3xl">
                Join Truck Tracker!
              </Text>
              <Box my={10} mx="auto">
                <FormRegister />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
  )
}

export default Register
