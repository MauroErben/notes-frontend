import React from 'react'
import {
  Stack,
  VStack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea
} from '@chakra-ui/react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import InputError from '../auth/inputError'
import { useNavigate, useLocation } from 'react-router-dom'
import { createNote, updateNote } from '../../services/privateApiServices'
import { showErrorAlert, showSuccessAlert } from '../../utils/alerts'

const notesSchema = Yup.object().shape({
  title: Yup.string().required('Title is required')
})

function NotesForm () {
  const navigate = useNavigate()
  const location = useLocation()

  const crear = (values) => {
    createNote(values)
      .then(res => {
        if (res?.status === 200) {
          showSuccessAlert(res.data.message)
          navigate('/')
        } else {
          showErrorAlert('Ocurrio un error al crear la nota')
        }
      })
      .catch(error => console.log(error))
  }

  const actualizar = (id, values) => {
    updateNote(id, values)
      .then(res => {
        if (res?.status === 200) {
          showSuccessAlert(res.data.message)
          navigate('/')
        } else {
          showErrorAlert('Ocurrio un error al actualizar la nota')
        }
      })
      .catch(error => console.log(error))
  }

  const handleNewNote = (values, { setSubmitting, resetForm }) => {
    if (location.state) {
      actualizar(location.state._id, values)
    } else {
      crear(values)
    }
    resetForm()
    setSubmitting(false)
  }

  return (
    <Stack
      justify='center'
      align='center'
    >
      <Formik
        enableReinitialize
        initialValues={{ title: '', note: '' }}
        validationSchema={notesSchema}
        onSubmit={handleNewNote}
      >
        {({ handleSubmit, handleChange, handleBlur, touched, errors, values, isSubmitting }) => (
          <VStack
            width={[300, 400, 500]}
            boxShadow='lg'
            borderRadius='md'
          >
            <Box
              width='full'
              padding={8}
              backgroundColor='blue.500'
              clipPath='polygon(0 0, 100% 0, 100% 100%, 0 80%)'
              color='white'
              textAlign='center'
            >
              <Heading as='h1' size='lg'>ONLINE NOTES</Heading>
              <Heading as='h3' size='sm'>{location.state ? 'Actualizar' : 'Nueva nota'}</Heading>
            </Box>

            <VStack
              width='full'
              padding={[2, 4, 6, 8]}
              spacing={4}
            >
              <FormControl>
                <FormLabel>Titulo</FormLabel>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  name='title'
                  type='text'
                  placeholder='Titulo de la nota'
                />
                {errors.title && touched.title && <InputError>{errors.title}</InputError>}
              </FormControl>

              <FormControl>
                <FormLabel>Nota</FormLabel>
                <Textarea
                  name='note'
                  value={values.note}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Ingresa una nota'
                />
                {errors.note && touched.note && <InputError>{errors.note}</InputError>}
              </FormControl>

              {/* FOOTER */}
              <Button
                type='submit'
                colorScheme='blue'
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {location.state ? 'Actualizar nota' : 'Crear nota'}
              </Button>
              <Button
                colorScheme='red'
                onClick={() => navigate('/')}
              >
                Volver
              </Button>
            </VStack>
          </VStack>
        )}
      </Formik>
    </Stack>
  )
}
export default NotesForm
