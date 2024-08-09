import React from 'react'
import {Link} from 'react-router-dom'

const UserHeader = () => {
  return (
    <nav>
        <Link to = '/user'><li>Home</li></Link>
        <Link to = '/product'><li>Dashboard</li></Link>
    </nav>
  )
}

export default UserHeader