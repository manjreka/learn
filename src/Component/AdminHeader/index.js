import React from 'react'
import {Link} from 'react-router-dom'

const AdminHeader = () => {
  return (
    <nav>
        <Link to = '/admin'><li>Home</li></Link>
        <Link to = '/adminDashboard'><li>Dashboard</li></Link>
    </nav>
  )
}

export default AdminHeader