// import { Badge, Box, Button, Center, Image, Text, Wrap, WrapItem } from '@chakra-ui/react'
// import React, { useEffect } from 'react'
// import { IoCalendarOutline, IoFastFood, IoFastFoodOutline, IoLocationOutline, IoTrashOutline } from 'react-icons/io5'
// import { useDispatch, useSelector } from 'react-redux'
// import { getPublicDetails } from '../redux/details/actions'
// import { getPublicSchedules } from '../redux/schedules/actions'
// import Logo from '../images/logo.png'
// import { toggleFavorite } from '../redux/favorites/actions'
// import DetailCard from './DetailCard'

// function RestaurantCard() {
//   // @ts-ignore
//   const { publicItems, isLoading, isError, error } = useSelector((state) => state.details)
//   // @ts-ignore
//   const { publicItems: schedulePublicItems } = useSelector((state) => state.schedules)
//   const dispatch = useDispatch()
//   useEffect(() => {
//     // @ts-ignore
//     dispatch(getPublicDetails())
//     // @ts-ignore
//     dispatch(getPublicSchedules())
//   }, [dispatch])
//   function handleFavorite(id) {
//     // @ts-ignore
//     dispatch(toggleFavorite(id))
//   }

//   return (
//     <Wrap justify="center">
//       {publicItems.map((detail) => (
//         <DetailCard key={detail.id} detail={detail} />
//       ))}
//     </Wrap>
//   )
// }

// export default RestaurantCard
