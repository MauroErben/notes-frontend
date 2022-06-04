import React from 'react'
import { VStack, Heading, Text, Button, chakra } from '@chakra-ui/react'

function Welcome () {
  return (
    <VStack
      height='90vh'
      spacing={8}
      alignItems='center'
      justifyContent='center'
      padding={[2, 4, 6, 8]}
      textAlign='center'
      fontSize={['xl', '2xl', '3xl']}
    >
      <Heading as='h1' color='blue.500'>ONLINE NOTES</Heading>
      <Heading><chakra.span color='blue.500'>¡Hola!</chakra.span> Bienvenido/a al creador de notas online, para comenzar a crear notas, debes iniciar sesión en tu cuenta</Heading>
      <Text>Al crear una cuenta, podrás crear y administrar todas las notas que necesites de una manera fácil y rápida.</Text>
      <Button
        colorScheme='blue'
      >
        ¡Comencemos!
      </Button>
    </VStack>
  )
}
export default Welcome
