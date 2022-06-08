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
  Text,
  Link
} from '@chakra-ui/react'
import { Link as ReachLink, useNavigate, Navigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import InputError from './inputError'
import { loginUser } from '../../services/publicApiServices'
import Spinner from '../spinner'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
})

function LoginForm () {
  const navigate = useNavigate()
  const token = localStorage.getItem('online-notes')

  const handleLogin = (values, { setSubmitting, resetForm }) => {
    loginUser(values)
      .then(res => {
        if (res) {
          const { token } = res.data
          localStorage.setItem('online-notes', token)
          resetForm()
          navigate('/', { replace: true })
        }
        setSubmitting(false)
      })
      .catch(error => console.log(error))
  }

  // Si estamos autenticados, denegamos el acceso al login
  if (token) {
    return (
      <Navigate to='/' />
    )
  }

  return (
    <Stack
      justify='center'
      align='center'
    >
      <Formik
        enableReinitialize
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
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
              <Heading as='h3' size='sm'>Login</Heading>
            </Box>

            <VStack
              width='full'
              padding={[2, 4, 6, 8]}
              spacing={4}
            >
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name='email'
                  type='email'
                  placeholder='Ingresa tu email'
                />
                {errors.email && touched.email && <InputError>{errors.email}</InputError>}
              </FormControl>

              <FormControl>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  name='password'
                  type='password'
                  placeholder='Ingresa tu contraseña'
                />
                {errors.password && touched.password && <InputError>{errors.password}</InputError>}
              </FormControl>

              {/* FOOTER */}
              <Button
                type='submit'
                colorScheme='blue'
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Ingresar
              </Button>
              {isSubmitting && <Spinner size={40} />}
              <Text>¿No tienes una cuenta? <Link color='blue.300' as={ReachLink} to='/auth/register'>Registrate</Link></Text>
            </VStack>
          </VStack>
        )}
      </Formik>
    </Stack>
  )
}
export default LoginForm
