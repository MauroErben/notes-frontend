import React from 'react'
import { VStack, Text, Image } from '@chakra-ui/react'

function Footer () {
  return (
    <VStack
      position='relative'
    >
      <Text
        position='absolute'
        left='50%'
        top='58%'
        color='white'
        fontWeight='bold'
        transform='translate(-50%, -50%)'
      >
        © Mauro Erben 2022
      </Text>
      <Image src='/wave.svg' />
    </VStack>
  )
}
export default Footer
