import React from 'react'
import { VStack, Container, Heading, Text } from '@chakra-ui/react'
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
        textAlign='center'
      >
        <Heading color='blue.500'>TUS NOTAS</Heading>
        <Text>Aqui veras todas tus notas y podras administrarlas</Text>
        <Notes />
      </VStack>
    </Container>
  )
}
export default Home
