import React from 'react'
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom'
import Welcome from '../components/welcome'
import Home from '../components/home'
import RegisterForm from '../components/auth/registerForm'
import LoginForm from '../components/auth/loginForm'
// import Footer from '../components/footer'
import NotesForm from '../components/notes/notesForm'

function Routes () {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' element={<Home />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/auth/register' element={<RegisterForm />} />
          <Route path='/auth/login' element={<LoginForm />} />
          <Route path='/create' element={<NotesForm />} />
        </Switch>
      </Router>
      {/* <Footer /> */}
    </>
  )
}
export default Routes
