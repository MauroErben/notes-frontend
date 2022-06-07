import React, { useEffect, useState } from 'react'
import NotesItems from './notesItems'
import { VStack, HStack, Select, Button } from '@chakra-ui/react'
import { getAllNotes, deleteNote } from '../../services/privateApiServices'
import { useNavigate } from 'react-router-dom'
import { MdOutlineNoteAlt } from 'react-icons/md'
import Spinner from '../spinner'

function Notes () {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [orderValue, setOrderValue] = useState('Fecha')
  const navigate = useNavigate()

  const handleChangeValue = (e) => {
    ordenarArray(e.target.value)
  }

  const ordenarArray = value => {
    setOrderValue(value)
    if (value === 'Nombre') {
      return notes.sort((a, b) => a.title.localeCompare(b.title))
    } else if (value === 'Fecha') {
      return notes.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    }
  }

  const handleDelete = (id) => {
    const result = confirm('¿Estas seguro que quires eliminar esta nota?')
    if (result) {
      deleteNote(id)
        .then(res => console.log(res.data))
        .catch(error => console.log(error))
    }
  }

  useEffect(() => {
    setLoading(true)
    const getNotes = () => {
      getAllNotes()
        .then(res => {
          setNotes(res.data.notas)
          setLoading(false)
        })
        .catch(error => console.log(error))
    }
    getNotes()
  }, [])

  return (
    <VStack>
      <HStack
        w='full'
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
      {loading ? <Spinner size={40} /> : <NotesItems listaNotas={notes} handleDelete={handleDelete} />}
    </VStack>
  )
}
export default Notes
