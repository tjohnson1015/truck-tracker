import React, { useEffect } from 'react'
import { Box, Center, Image, Wrap, WrapItem } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../redux/favorites/actions'
import DetailCard from '../components/DetailCard'
import { getPublicDetails } from '../redux/details/actions'
import { getPublicSchedules } from '../redux/schedules/actions'
import OpenTrucks from '../images/openneon.png'
import AllTrucks from '../images/alltrucks.png'
import OpenSign from '../images/opensign.png'

function ListView() {
  // @ts-ignore
  const { publicItems, isLoading, isError, error } = useSelector((state) => state.details)
  // @ts-ignore
  const { publicItems: schedulePublicItems } = useSelector((state) => state.schedules)
  const dispatch = useDispatch()
  useEffect(() => {
    // @ts-ignore
    dispatch(getPublicDetails())
    // @ts-ignore
    dispatch(getPublicSchedules())
  }, [dispatch])
  function handleFavorite(id) {
    // @ts-ignore
    dispatch(toggleFavorite(id))
  }

  return (
    <div>
      <Center>
        <Box mt={5}>
          <Image h="200px" w="250px" src={OpenSign} alt="open" />
        </Box>
      </Center>
      <Wrap justify="center">
        {schedulePublicItems.map((schedule) => (
          <DetailCard key={schedule.id} detail={schedule.User.Detail} />
        ))}
      </Wrap>
      <Center>
        <Box mt={5}>
          <Image h="100px" w="300px" src={AllTrucks} alt="open" />
        </Box>
      </Center>

      <Wrap justify="center">
        {publicItems.map((detail) => (
          <DetailCard key={detail.id} detail={detail} />
        ))}
      </Wrap>
    </div>
  )
}

export default ListView
