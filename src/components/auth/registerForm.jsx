import React from 'react'
import {
  Stack,
  VStack,
  FormControl,
  FormLabel,
  Box,
  Input,
  Button,
  Text,
  Link,
  Heading
} from '@chakra-ui/react'
import { Link as ReachLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import InputError from './inputError'

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be more than 8 characters').required('Password is required')
})

function RegisterForm () {
  const handleRegister = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      console.log(values)
      setSubmitting(false)
      resetForm()
    }, 400)
  }

  return (
    <Stack
      height='90vh'
      justify='center'
      align='center'
    >
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({ handleSubmit, handleChange, handleBlur, touched, values, errors, isSubmitting }) => (
          // CONTAINER
          <VStack
            width={[300, 400, 500]}
            boxShadow='lg'
            borderRadius='md'
          >
            {/* HEADER */}
            <Box
              width='full'
              padding={8}
              backgroundColor='blue.500'
              clipPath='polygon(0 0, 100% 0, 100% 100%, 0 80%)'
              color='white'
              textAlign='center'
            >
              <Heading as='h1' size='lg'>ONLINE NOTES</Heading>
              <Heading as='h3' size='sm'>Register</Heading>
            </Box>
            {/* MAIN */}
            <VStack
              width='full'
              padding={[2, 4, 6, 8]}
              spacing={4}
            >
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  name='name'
                  type='text'
                  placeholder='Ingresa tu nombre'
                />
                {errors.name && touched.name && <InputError>{errors.name}</InputError>}
              </FormControl>

              <FormControl isRequired>
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

              <FormControl isRequired>
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
                onClick={handleSubmit}
                type='submit'
                colorScheme='blue'
                disabled={isSubmitting}
              >
                Crear cuenta
              </Button>
              <Text>¿Ya tienes una cuenta? <Link color='blue.300' as={ReachLink} to='/auth/login'>Inicia sesión</Link></Text>
            </VStack>
          </VStack>
        )}
      </Formik>
    </Stack>
  )
}
export default RegisterForm
