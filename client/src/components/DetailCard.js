import {
  Badge,
  Box,
  Button,
  Center,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  WrapItem,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
  IoCalendarOutline,
  IoFastFoodOutline,
  IoHeartCircleOutline,
  IoHeartOutline,
  IoLocationOutline,
  IoTrashOutline,
} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { getAllPublicSchedules, getPublicSchedules } from '../redux/schedules/actions'
import { toggleFavorite } from '../redux/favorites/actions'
import Logo from '../images/logo.png'

function DetailCard({ detail }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenLocation, onOpen: onOpenLocation, onClose: onCloseLocation } = useDisclosure()
  const { isOpen: isOpenMenu, onOpen: onOpenMenu, onClose: onCloseMenu } = useDisclosure()
  const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
  const [overlay, setOverlay] = React.useState(<OverlayOne />)
  // @ts-ignore
  const { items, isLoading } = useSelector((state) => state.favorites)
  // @ts-ignore
  const { publicItems, allPublicItems, isLoading: scheduleIsLoading } = useSelector((state) => state.schedules)
  const dispatch = useDispatch()
  function handleFavorite(id) {
    // @ts-ignore
    dispatch(toggleFavorite(id))
  }
  useEffect(() => {
    // @ts-ignore
    dispatch(getPublicSchedules())
  }, [dispatch])
  useEffect(() => {
    // @ts-ignore
    dispatch(getAllPublicSchedules())
  }, [dispatch])
  const isFavorite = items.some((item) => detail.id === item.Detail.id)
  const schedules = publicItems.filter((item) => item.User.Detail.id === detail.id)
  const allSchedules = allPublicItems.filter((item) => item.User.Detail.id === detail.id)
  return (
    <WrapItem>
      <Box m="7" bg="white" borderRadius="lg">
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Center>
            <Image h="275px" w="275px" src={Logo} alt="logo" />
          </Center>
          <Box p="6">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {detail.cuisine}
            </Badge>
            <Box display="flex" alignItems="baseline"></Box>

            <Box mt="2" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
              {detail.name}
            </Box>

            <Box mt="2">
              <Text noOfLines={3} overflow="scroll">
                {detail.description}
              </Text>
            </Box>

            <Box display="flex" mt="3" alignItems="center" justifyContent="space-around">
              <Button
                colorScheme="teal"
                variant="ghost"
                fontSize="30px"
                onClick={() => {
                  setOverlay(<OverlayOne />)
                  onOpen()
                }}
              >
                <IoCalendarOutline />
              </Button>
              <Button
                colorScheme="teal"
                variant="ghost"
                fontSize="30px"
                onClick={() => {
                  setOverlay(<OverlayOne />)
                  onOpenMenu()
                }}
              >
                <IoFastFoodOutline />
              </Button>
              <Button
                colorScheme="teal"
                variant="ghost"
                fontSize="30px"
                onClick={() => {
                  setOverlay(<OverlayOne />)
                  onOpenLocation()
                }}
              >
                <IoLocationOutline />
              </Button>
              <Button colorScheme="teal" variant="ghost" fontSize="30px" onClick={() => handleFavorite(detail.id)}>
                {isFavorite ? <IoTrashOutline /> : <IoHeartOutline />}
              </Button>

              <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{detail.name} | All Upcoming Events</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {allSchedules.map((schedule) => (
                      <div style={{ margin: '2px' }}>
                        <Text>
                          {moment(schedule.start).format('llll')} - {moment(schedule.end).format('LT')}
                        </Text>
                        <Text>
                          {schedule.location} | {schedule.address}
                        </Text>
                      </div>
                    ))}
                  </ModalBody>

                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Modal isCentered isOpen={isOpenLocation} onClose={onCloseLocation}>
                {overlay}
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{detail.name} | Live Events</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {schedules.length > 0 ? (
                      schedules.map((schedule) => (
                        <div>
                          <h1>
                            Open now at {schedule.location} from {moment(schedule.start).format('LT')} to{' '}
                            {moment(schedule.end).format('LT')}
                          </h1>
                          <h2>{schedule.address}</h2>
                          <h2>See you there!</h2>
                        </div>
                      ))
                    ) : (
                      <div>Not currently open. Try the schedule icon to see upcoming events!</div>
                    )}
                  </ModalBody>

                  <ModalFooter>
                    <Button onClick={onCloseLocation}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Modal isCentered isOpen={isOpenMenu} onClose={onCloseMenu}>
                {overlay}
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{detail.name}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>In time, there will be a menu here</ModalBody>

                  <ModalFooter>
                    <Button onClick={onCloseMenu}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Box>
        </Box>
      </Box>
    </WrapItem>
  )
}

export default DetailCard
