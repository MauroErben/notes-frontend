import React, { useEffect, useState } from 'react'
import NotesItems from './notesItems'
import { Box, HStack, Select, Button } from '@chakra-ui/react'
import { getAllNotes, deleteNote } from '../../services/privateApiServices'
import { useNavigate } from 'react-router-dom'
import { MdOutlineNoteAlt } from 'react-icons/md'

function Notes () {
  const [notes, setNotes] = useState([])
  const [orderValue, setOrderValue] = useState('Nombre')
  const navigate = useNavigate()

  const handleChangeValue = (e) => {
    setOrderValue(e.target.value)
  }

  const handleDelete = (id) => {
    const result = confirm('¿Estas seguro que quires eliminar esta nota?')
    if (result) {
      deleteNote(id)
        .then(res => console.log(res.data))
        .catch(error => console.log(error))
    }
  }

  const orderArray = array => {
    if (orderValue === 'Nombre') {
      return array.sort((a, b) => a.title.localeCompare(b.title))
    } else if (orderValue === 'Fecha') {
      return array.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    }
  }

  useEffect(() => {
    const getNotes = () => {
      getAllNotes()
        .then(res => setNotes(orderArray(res.data.notas)))
        .catch(error => console.log(error))
    }
    getNotes()
  }, [orderValue, handleDelete])

  return (
    <Box>
      <HStack
        justify='space-between'
        py={[2, 4, 6, 8]}
      >
        <Button
          colorScheme='blue'
          leftIcon={<MdOutlineNoteAlt size={24} />}
          onClick={() => navigate('/create')}
        >
          Crear nota
        </Button>
        <Select
          width='150px'
          value={orderValue}
          onChange={handleChangeValue}
        >
          <option>Nombre</option>
          <option>Fecha</option>
        </Select>
      </HStack>
      <NotesItems listaNotas={notes} handleDelete={handleDelete} />
    </Box>
  )
}
export default Notes
