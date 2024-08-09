import React from 'react'
import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = (props) => {
  const token = Cookies.get('jwt-token')
  if (token === undefined) {
    return <Redirect to = '/login' />
  }
    return (
      <Route {...props} />
    )
  }

export default ProtectedRoute
