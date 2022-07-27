import { Box, Center, Image, Input, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { Autocomplete, GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { IoSearchOutline } from 'react-icons/io5'
import Background from '../images/cityimage.jpeg'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPublicSchedules } from '../redux/schedules/actions'
import marker from '../images/mapmarker.png'
import Schedule from './Schedule'

function HomeMap() {
  return (
    <div>
      <Map />
    </div>
  )
}
function Map() {
  // @ts-ignore
  const { publicItems, isLoading, isError, error } = useSelector((state) => state.schedules)
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(getPublicSchedules())
  }, [dispatch])

  const [clicked, setClicked] = useState(null)

  return (
    <div>
      <Box>
        <GoogleMap zoom={11} center={{ lat: 38.2527, lng: -85.7585 }} mapContainerClassName="map-container">
          <Autocomplete>
            <input
              type="text"
              placeholder="Search Your City"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `50%`,
                height: `60px`,
                padding: `0 12px`,
                borderRadius: `25px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `18px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: 'absolute',
                left: '25%',
                marginTop: '25px',
              }}
            />
          </Autocomplete>
          {publicItems.map((schedule) => (
            <Marker
              icon={marker}
              key={schedule.id}
              position={{
                lat: Number(schedule.lat),
                lng: Number(schedule.lng),
              }}
              onClick={(e) => {
                setClicked(schedule)
              }}
            />
          ))}
          {clicked && (
            <InfoWindow
              onCloseClick={() => {
                setClicked(null)
              }}
              position={{
                lat: Number(clicked.lat),
                lng: Number(clicked.lng),
              }}
            >
              <div>
                <Center>
                  <VStack>
                    <Text>{clicked?.User?.Detail?.name}</Text>
                    <Text>{clicked?.location}</Text>
                    <Text>{clicked?.address}</Text>
                    <Text>
                      {moment(clicked?.start).format('LL')}, {moment(clicked?.start).format('LT')} to{' '}
                      {moment(clicked?.end).format('LT')}
                    </Text>
                  </VStack>
                </Center>
                {/* <h1>{clicked?.User?.Detail?.name}</h1> */}
                {/* <div>{JSON.stringify(clicked)}</div> */}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </Box>
    </div>
  )
}

export default HomeMap
