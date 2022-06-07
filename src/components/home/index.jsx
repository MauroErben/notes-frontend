import React from 'react'
import { VStack, Container } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import Notes from '../notes'

function Home () {
  const token = localStorage.getItem('online-notes')

  if (!token) {
    return (<Navigate to='/auth/login' replace />)
  }

  return (
    <Container
      maxW='container.md'
      height='90vh'
      // padding={[2, 4, 6, 8]}
    >
      <VStack
        backgroundColor='gray.300'
        spacing={4}
        padding={[2, 4, 6, 8]}
        margin={[2, 4, 6, 8]}
        borderRadius='md'
        textAlign='center'
      >
        <Notes />
      </VStack>
    </Container>
  )
}
export default Home
