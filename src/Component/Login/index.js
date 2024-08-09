import { Link, Redirect } from 'react-router-dom'
import { Component } from 'react'
import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookies from 'js-cookie'
import RoleContext from '../../Context/roleContext'

import './index.css'


class Login extends Component {
    state = { emailLogin: '', passowrdLogin: '', emailLoginErr: false, passLoginErr: false, showLoginPass: false }

    emailEntered = event => {
        this.setState({ emailLogin: event.target.value })
    }

    passwordEntered = event => {
        this.setState({ passowrdLogin: event.target.value })
    }

    
    loginSuccess = (data) => {
        let jwtToken = data.token
        const {history}= this.props 
        let role = data.role
        Cookies.set('jwt_token', jwtToken, { expires: 30 })
        Cookies.set('role', role, { expires: 30 })
        if (role === 'user'){
            console.log('hello world')
            window.location.href = './user'
        }
        else {
            history.replace('')
        }
    }


    loginFailure = (message) => {
        alert(`${message}`)
    }

    submitUserDetailsLogin = async () => {
        const { emailLogin, passowrdLogin } = this.state

        const userDetails = {
            email: emailLogin,
            password: passowrdLogin
        }
        const loginUrl = 'http://localhost:2727/login'

        const loginOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(loginUrl, loginOptions)
        const data = await response.json()
        if (response.ok) {
            this.loginSuccess(data)
        }
        else {
            this.loginFailure(data)
        }
    }


    loginFormSubmit = event => {
        event.preventDefault()
        const { emailLogin, passowrdLogin } = this.state

        // email required
        if (emailLogin === '') {
            this.setState({ emailLoginErr: true })
        }
        else {
            this.setState({ emailLoginErr: false })
        }

        // password required 
        if (passowrdLogin === '') {
            this.setState({ passLoginErr: true })
        }
        else {
            this.setState({ passLoginErr: false })
        }

        if (emailLogin !== '' && passowrdLogin !== '') {
            this.submitUserDetailsLogin()
        }
        else {
            alert('Plaese Enter all details!!')
        }
    }


    passwordToggle = () => {
        this.setState(prevstate => ({ showLoginPass: !prevstate.showLoginPass }))
    }



    render() {
        const { emailLogin, passowrdLogin, emailLoginErr, passLoginErr, showLoginPass } = this.state

        // make changes with redirect wrt ROLE
        // const jwtToken = Cookies.get('jwt_token')
        // if (jwtToken !== undefined) {
        //     return <Redirect to="/" />
        // }

        return (
            <div className='main-container'>
                <form className='register-container' onSubmit={this.loginFormSubmit}>
                    <h1 style={{ alignSelf: 'center' }} >Login</h1>
                    <div>
                        <div style={{ border: '1px solid lightgrey' }}>
                            <input value={emailLogin} onChange={this.emailEntered} className='input' style={{ width: '22vw' }} type="email" placeholder='Email' />
                        </div>
                        {emailLoginErr && <p className='error-message'>*Required</p>}
                    </div>
                    <div>
                        <div className='container' >
                            <input value={passowrdLogin} onChange={this.passwordEntered} style={{ width: '22vw' }} className='input' type={showLoginPass ? 'text' : 'password'} placeholder='Password' />
                            {showLoginPass ? <FaEye onClick={this.passwordToggle} /> : <FaEyeSlash onClick={this.passwordToggle} />}
                        </div>
                        {passLoginErr && <p className='error-message'>*Required</p>}
                    </div>
                    <p style={{ alignSelf: 'center', color: '#002fa7' }}>Forget password?</p>
                    <div className='button-cont'>
                        <button className='button' style={{ width: '26vw' }} type="submit">Signup</button>
                    </div>
                    <p style={{ alignSelf: 'center' }} >Don't have an account? <Link to='/register'>Singup</Link> </p>
                </form>
            </div>
        )
    }
}

export default Login