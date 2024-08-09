import React from 'react'
import { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './Component/Login'
import ProtectedRoute from './Component/ProtectedRoute'
import Register from './Component/Register'
import AdminDashBoard from './Component/AdminDashBorad'
import Product from './Component/UserProduct'
import AdminHome from './Component/AdminHome'
import UserHome from './Component/UserHome'
import Cookies from 'js-cookie'


class App extends Component {
  state = { role: 'user' }

  onChangeRole = () => {
    const role = Cookies.get('role')
    console.log(role)
    console.log('app')
    this.setState({ role })
  }

  renderAdminRoutes = () => (
    <>
      <ProtectedRoute exact path='/admim' component={AdminHome} />
      <ProtectedRoute exact path='/adminDashboard' component={AdminDashBoard} />
    </>
  )

  renderUserRoutes = () => (
    <>
      <ProtectedRoute exact path='/product' component={Product} />
      <ProtectedRoute exact path='/user' component={UserHome} />
    </>
  )

  render() {
    const role = Cookies.get('role')
    console.log(role)
    return (
        <Switch>
          <Route exact path='/login' onChangeRole = {this.onChangeRole}  component={Login} />
          <Route exact path='/register' component={Register} />
          <ProtectedRoute exact path='/user' component={UserHome} />
          {role === 'admin' ? this.renderAdminRoutes() : this.renderUserRoutes()}
        </Switch>
    )
  }
}

export default App