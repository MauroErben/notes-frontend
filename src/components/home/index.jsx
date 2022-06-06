import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'

function Home () {
  const token = localStorage.getItem('online-notes')

  if (!token) {
    return (<Navigate to='/auth/login' replace />)
  }

  return (
    <Box>
      <Text>Home</Text>
    </Box>
  )
}
export default Home
