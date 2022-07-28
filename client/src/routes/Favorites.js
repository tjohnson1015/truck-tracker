import { Box, Center, Flex, Image, SimpleGrid, Text, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavorites } from '../redux/favorites/actions'
import DetailCard from '../components/DetailCard'
import Favorite from '../images/favorites.png'
import Frown from '../images/frown.png'

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
      {items.length > 0 ? (
        <>
          <Center>
            <Box m={10} p={5} borderBottom="1px solid white">
              <Image h="125px" w="350px" src={Favorite} alt="open" />
            </Box>
          </Center>
          <Wrap justify="center">
            {items.map((favorite) => (
              <DetailCard detail={favorite.Detail} />
            ))}
          </Wrap>
        </>
      ) : (
        <>
          <Flex direction="column" m={10}>
            <Center>
              <Box>
                <Image h="250px" w="250px" src={Frown} alt="open" />
              </Box>
            </Center>
            <Center>
              <Box mt={4} p={5} borderBottom="1px solid white">
                <Text>Looks like you dont have any favorites saved yet.</Text>
              </Box>
            </Center>
          </Flex>
        </>
      )}
    </>
  )
}

export default Favorites
