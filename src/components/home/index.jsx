import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import Notes from '../notes'

function Home () {
  const token = localStorage.getItem('online-notes')

  if (!token) {
    return (<Navigate to='/welcome' replace />)
  }

  return (
    <Container
      maxW='container.md'
      boxShadow={['sm', 'md', 'lg', '2xl']}
    >
      <Box>
        <Notes />
      </Box>
    </Container>
  )
}
export default Home
