import { VStack, Box, Heading, Text, HStack, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function NotesItems ({ listaNotas, handleDelete }) {
  const navigate = useNavigate()

  const deleteNote = (id) => {
    handleDelete(id)
  }

  if (listaNotas.length > 0) {
    return (
      <VStack
        spacing={4}
        textAlign='start'
      >
        {listaNotas.map(items => (
          <React.Fragment key={items._id}>
            <Box
              width={[300, 400, 600]}
              padding={[2, 4, 6, 8]}
              borderRadius={4}
              boxShadow='lg'
              backgroundColor='white'
            >
              <Heading size='md'>{items.title}</Heading>
              <Text>{items.note}</Text>
              <HStack
                pt={2}
                justify='space-between'
                align='center'
              >
                <Text fontWeight='bold' size='sm'>{new Date(items.createdAt).toLocaleDateString()}</Text>
                <HStack
                  spacing={2}
                >
                  <IconButton onClick={() => navigate('/create', { state: items })} aria-label='editar nota' colorScheme='blue' icon={<FaEdit />} />
                  <IconButton onClick={() => deleteNote(items._id)} aria-label='eliminar nota' colorScheme='red' icon={<MdDelete />} />
                </HStack>
              </HStack>
            </Box>
          </React.Fragment>
        ))}
      </VStack>
    )
  } else {
    return (
      <VStack
        justify='center'
        align='center'
      >
        <Text color='gray.500'>Aun no tienes notas</Text>
      </VStack>
    )
  }
}
export default NotesItems
