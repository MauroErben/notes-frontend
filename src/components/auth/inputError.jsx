import React from 'react'
import { Box } from '@chakra-ui/react'

function InputError ({ children }) {
  return (
    <Box
      padding={2}
      color='red.300'
      fontSize='sm'
    >
      {children}
    </Box>
  )
}
export default InputError
