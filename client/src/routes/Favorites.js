import { Box, Center, Image, SimpleGrid, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavorites } from '../redux/favorites/actions'
import DetailCard from '../components/DetailCard'
import Favorite from '../images/favorites.png'

function Favorites() {
  // @ts-ignore
  const { items, isLoading } = useSelector((state) => state.favorites)
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(getFavorites())
  }, [dispatch])

  return (
    <>
      <Center>
        <Box mt={5}>
          <Image h="125px" w="350px" src={Favorite} alt="open" />
        </Box>
      </Center>
      <Wrap justify="center">
        {items.map((favorite) => (
          <DetailCard detail={favorite.Detail} />
        ))}
      </Wrap>
    </>
  )
}

export default Favorites
