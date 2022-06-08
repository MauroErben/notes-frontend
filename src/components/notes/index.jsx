import React, { useEffect, useState } from 'react'
import NotesItems from './notesItems'
import { VStack, HStack, Select, Button, Heading, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { getAllNotes, deleteNote } from '../../services/privateApiServices'
import { useNavigate } from 'react-router-dom'
import { MdOutlineNoteAlt } from 'react-icons/md'
import Spinner from '../spinner'
import { showQuestionAlert, showSuccessAlert, showErrorAlert } from '../../utils/alerts'
import { GiHamburgerMenu } from 'react-icons/gi'

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
      return notes.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    }
  }

  const getNotes = () => {
    setLoading(true)
    getAllNotes()
      .then(res => {
        if (res?.status === 200) {
          setNotes(res.data.notas)
          setLoading(false)
        } else {
          showErrorAlert('Ocurrio un error al obtener las notas')
        }
      })
      .catch(error => console.log(error))
  }

  const handleDelete = (id) => {
    showQuestionAlert('¿Estas seguro que quieres eliminar esta nota?', () => {
      deleteNote(id)
        .then(res => {
          if (res?.status === 200) {
            showSuccessAlert(res.data.message)
            getNotes()
          } else {
            showErrorAlert('Ocurrio un error al eliminar la nota')
          }
        })
        .catch(error => console.log(error))
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('online-notes')
    navigate('/welcome', { replace: true })
  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <VStack
      width='full'
      padding={[2, 4, 6, 8]}
      spacing={4}
    >
      <HStack
        width='full'
        justify='space-between'
      >
        <Heading size='lg' color='blue.500'>TUS NOTAS</Heading>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            variant='outline'
            transition='all 0.2s'
            icon={<GiHamburgerMenu />}
          />
          <MenuList>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <HStack
        width='full'
        justify='space-between'
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
