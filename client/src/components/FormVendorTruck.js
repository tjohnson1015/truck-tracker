import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  localStorageManager,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Autocomplete } from '@react-google-maps/api'
import React, { useEffect, useRef, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { createDetail, getDetails } from '../redux/details/actions'
import Logo from '../images/logo.png'
import '../App.css'

function FormVendorTruck() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const autocompleteRef = useRef()
  // @ts-ignore
  const { items, isLoading, isError, error, details } = useSelector((state) => state.details)

  const [showForm, setShowForm] = useState(false)

  const updateField = (name, value) => {
    setNewDetail({
      ...newDetail,
      [name]: value,
    })
  }

  const [newDetail, setNewDetail] = useState({
    name: '',
    location: '',
    description: '',
    lat: null,
    lng: null,
    picture: '',
    cuisine: '',
    menu: '',
    phone: null,
    email: '',
    web: '',
    facebook: '',
    instagram: '',
  })

  useEffect(() => {
    // @ts-ignore
    dispatch(getDetails())
  }, [dispatch])

  useEffect(() => {
    if (!isLoading && !isError) {
      setNewDetail({
        name: '',
        location: '',
        description: '',
        lat: null,
        lng: null,
        picture: '',
        cuisine: '',
        menu: '',
        phone: null,
        email: '',
        web: '',
        facebook: '',
        instagram: '',
      })
    }
  }, [dispatch, isError, isLoading])

  function handleAddDetail() {
    // setAllDetails([...allDetails, newDetail])
    console.log(newDetail)

    // @ts-ignore
    dispatch(createDetail(newDetail))
    setShowForm(false)
  }

  function onLoad(autocomplete) {
    autocompleteRef.current = autocomplete
  }
  function onPlaceChanged() {
    if (autocompleteRef.current) {
      // @ts-ignore
      const place = autocompleteRef.current.getPlace()
      setNewDetail({
        ...newDetail,
        location: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
  const [overlay, setOverlay] = React.useState(<OverlayOne />)

  return (
    <>
      {!items || showForm ? (
        <>
          <Center>
            <Box minHeight="60vh" w="80%" bg="white" mt="10" borderRadius="10px">
              <Flex h="100%">
                <Box w="45%" m="8">
                  <Box h="95%" borderRadius="10px" className="form-vendor-truck">
                    <Center>
                      <Flex direction="column">
                        <Button
                          variant="ghost"
                          fontSize="60px"
                          p="10"
                          mt="45%"
                          style={{}}
                          onClick={() => {
                            setOverlay(<OverlayOne />)
                            onOpen()
                          }}
                        >
                          <IoAddOutline />
                        </Button>

                        <Modal isCentered isOpen={isOpen} onClose={onClose}>
                          {overlay}
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Details</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Stack spacing={4}>
                                <InputGroup>
                                  <InputLeftAddon children="https://" />
                                  <Input
                                    type="tel"
                                    placeholder="Your Website"
                                    onChange={(e) => updateField('web', e.target.value)}
                                  />
                                </InputGroup>

                                <InputGroup>
                                  <InputLeftAddon children="https://facebook.com/" />
                                  <Input
                                    placeholder="_example_url/"
                                    onChange={(e) => updateField('facebook', e.target.value)}
                                  />
                                </InputGroup>
                                <InputGroup>
                                  <InputLeftAddon children="https://www.instagram.com/" />
                                  <Input
                                    placeholder="_example_url/"
                                    onChange={(e) => updateField('instagram', e.target.value)}
                                  />
                                </InputGroup>
                                <Textarea
                                  placeholder="Short description of your company"
                                  size="sm"
                                  onChange={(e) => updateField('description', e.target.value)}
                                ></Textarea>
                              </Stack>
                            </ModalBody>

                            <ModalFooter>
                              <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Save
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>

                        <Text>Add Profile Picture and Links</Text>
                      </Flex>
                    </Center>
                  </Box>
                </Box>
                <Box w="55%" m="5">
                  <Center>
                    <Text h="10%">Enter Your Truck Details</Text>
                  </Center>
                  <InputGroup flexDirection="column" h="90%">
                    <Input
                      placeholder="Company Name"
                      mt="5"
                      onChange={(e) => setNewDetail({ ...newDetail, name: e.target.value })}
                    ></Input>
                    <Input
                      placeholder="Contact Number"
                      mt="5"
                      onChange={(e) => setNewDetail({ ...newDetail, phone: e.target.value })}
                    ></Input>
                    <Input
                      placeholder="Email"
                      mt="5"
                      onChange={(e) => setNewDetail({ ...newDetail, email: e.target.value })}
                    ></Input>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                      <Input
                        mt="5"
                        placeholder="Your city of buisness"
                        value={newDetail.location}
                        onChange={(e) => setNewDetail({ ...newDetail, location: e.target.value })}
                      />
                    </Autocomplete>
                    <Input
                      placeholder="Type of Cuisine"
                      mt="5"
                      onChange={(e) => setNewDetail({ ...newDetail, cuisine: e.target.value })}
                    ></Input>
                    <Button color="#ff5560" variant="ghost" mt="5" onClick={handleAddDetail}>
                      Add Your Truck!
                    </Button>
                  </InputGroup>
                </Box>
              </Flex>
            </Box>
          </Center>
        </>
      ) : (
        <>
          <Center>
            <Box minHeight="60vh" w="80%" bg="white" mt="10" borderRadius="10px" boxShadow="2xl">
              <Flex>
                <Box w="50%">
                  <Image src={Logo} alt="logo" p={10} />
                </Box>
                <Box w="50%">
                  <Center h="100%" w="100%">
                    <VStack divider={<StackDivider borderColor="gray.200" />} p={5} spacing={4} align="center">
                      <Text>{items.name}</Text>
                      <Text>{items.location}</Text>
                      <Text>{items.phone}</Text>
                      <Text>{items.email}</Text>
                      <Text>{items.web}</Text>
                      <Button
                        color="#ff5560"
                        variant="ghost"
                        onClick={() => {
                          setShowForm(true)
                        }}
                      >
                        Edit
                      </Button>
                    </VStack>
                  </Center>
                </Box>
              </Flex>
            </Box>
          </Center>
        </>
      )}
    </>
  )
}

export default FormVendorTruck
