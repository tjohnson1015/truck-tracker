import React, { useEffect, useRef, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { Box, Button, Center, Flex, Input, Text } from '@chakra-ui/react'
import { Autocomplete } from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'
import { createSchedule, getSchedules } from '../redux/schedules/actions'

const localizer = momentLocalizer(moment)

function Schedule() {
  const autocompleteRef = useRef()
  const dispatch = useDispatch()
  // @ts-ignore
  const { items, isLoading, isError, error } = useSelector((state) => state.schedules)

  const [newEvent, setNewEvent] = useState({
    location: '',
    address: '',
    lat: '',
    lng: '',
    start: new Date(),
    end: new Date(),
  })

  useEffect(() => {
    // @ts-ignore
    dispatch(getSchedules())
  }, [dispatch])

  useEffect(() => {
    if (!isLoading && !isError) {
      setNewEvent({
        location: '',
        address: '',
        lat: '',
        lng: '',
        start: new Date(),
        end: new Date(),
      })
    }
  }, [dispatch, isError, isLoading])

  function handleAddEvent() {
    // setAllEvents([...allEvents, newEvent])
    console.log(newEvent)
    // @ts-ignore
    dispatch(createSchedule(newEvent))
  }
  function onLoad(autocomplete) {
    autocompleteRef.current = autocomplete
  }
  function onPlaceChanged() {
    if (autocompleteRef.current) {
      // @ts-ignore
      const place = autocompleteRef.current.getPlace()
      setNewEvent({
        ...newEvent,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }
  return (
    <div>
      <Center>
        <Box bg="white" w="50%" mt="7" borderRadius="15px">
          <Center>
            <Input
              as={'input'}
              required
              placeholder="Name of Location"
              w="80%"
              m={2}
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />{' '}
          </Center>
          <Center>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} className="w-80">
              <Input
                placeholder="Physical Address"
                value={newEvent.address}
                onChange={(e) => setNewEvent({ ...newEvent, address: e.target.value })}
              />
            </Autocomplete>
          </Center>
          <Center>
            <Box mt="2" maxWidth="80%">
              <Flex>
                <Text p="12px">Start: </Text>
                <div
                  style={{
                    border: '1px solid rgb(222, 225, 235)',
                    padding: '10px',
                    borderRadius: '5px',
                    margin: '5px',
                    maxWidth: '80%',
                    overflow: 'hidden',
                  }}
                >
                  <DatePicker
                    placeholderText="Click to select start date"
                    selected={newEvent.start}
                    onChange={(start) => setNewEvent({ ...newEvent, start })}
                    showTimeSelect
                    isClearable
                    minDate={new Date()}
                    withPortal
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </div>
              </Flex>
              <Flex>
                <Text p="12px">End: </Text>
                <div
                  style={{
                    border: '1px solid rgb(222, 225, 235)',
                    padding: '10px',
                    borderRadius: '5px',
                    margin: '5px',
                    maxWidth: '80%',
                    overflow: 'hidden',
                  }}
                >
                  <DatePicker
                    placeholderText="Click to select end date"
                    selected={newEvent.end}
                    onChange={(end) => setNewEvent({ ...newEvent, end })}
                    showTimeSelect
                    isClearable
                    minDate={new Date()}
                    withPortal
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </div>
              </Flex>
            </Box>
          </Center>
          <Center>
            <Button color="#ff5560" variant="ghost" onClick={handleAddEvent} m={2}>
              Add Event to Your Schedule
            </Button>
          </Center>
        </Box>
      </Center>

      <Calendar
        localizer={localizer}
        events={items.map((schedule) => ({
          ...schedule,
          title: schedule.location,
          end: new Date(schedule.end),
          start: new Date(schedule.start),
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '500px', margin: '40px', backgroundColor: 'white', borderRadius: '15px', padding: '10px' }}
      />
    </div>
  )
}

export default Schedule
