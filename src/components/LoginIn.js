import React, { useState } from 'react'
import { Button, Col, Input, Row } from 'reactstrap'
import loginSide from '../assets/images/medical-lab.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [passwordValid, setPasswordValid] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const navigate = useNavigate();

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


  var users = localStorage.getItem('users');
  if (users === undefined || users === null) {
    users = [];
  } else {
    users = JSON.parse(users)
  }

  console.log(users)

  const handleCheck = () => {
    if (!emailRegex.test(email)) {
      setEmailValid(false)
      return false
    } else if (password.length <= 6) {
      setPasswordValid(false)
      return false
    } else {
      return true
    }
  }

  const handleEmail = (value) => {
    setEmail(value)
    setEmailValid(true)
    if (!emailRegex.test(email)) {
      setEmailValid(false)
    }
  }
  const handlePassword = (value) => {
    setPassword(value)
    setPasswordValid(true)
    if (password.length < 6) {
      setPasswordValid(false)
    }
  }

  const handleLogin = () => {
    console.log(email)
    console.log(password)
    var valid = handleCheck()
    if (valid) {
      var found = users.some(el => el.email === email && el.password === password);
      console.log(found)
      if (found) {
        navigate('/user-list')
      }
    }
  }

  return (
    <div className='login w-100'>
      <Row className='w-100'>
        <Col className='p-0' lg={6} md={6} sm={12}>
          <div>
            <img className='loging-side-image' src={loginSide} alt='sideimage' />
          </div>
        </Col>
        <Col className='px-5 py-4 py-lg-0 bg-white' lg={6} md={6} sm={12}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-center'>
              <img className='company-logo' src='https://www.shipcomwireless.com/img/shipcom-logo-black.svg' alt='logo' />
              <div className='form-heading mt-3'>
                <h2>Welcome</h2>
                <p>Login to Labs Monitoring System</p>
              </div>
              <div className='form '>
                <div className="coolinput">
                  <label htmlFor="email" className="text">Email ID</label>
                  <Input id='email' className='input-field input' type="email" name="input" value={email} onChange={(e) => handleEmail(e.target.value)} invalid={!emailValid} />
                  {!emailValid ? <div> <span>Enter valid Email</span> </div> : <></>}
                </div>
                <div className="coolinput">
                  <label htmlFor="password" className="text">Password</label>
                  <Input id='password' className='input-field input' type={show ? 'text' : 'password'} name="input" value={password} onChange={(e) => handlePassword(e.target.value)} invalid={!passwordValid} />
                  {show ? <AiFillEye size={20} className='eye-btn' onClick={() => setShow(!show)} /> : <AiOutlineEyeInvisible size={20} className='eye-btn' onClick={() => setShow(!show)} />}
                  {!passwordValid && password.length < 6 ? <div> <span>Enter valid Password</span> </div> : <></>}
                </div>
                <div className='my-3'>
                  <Button className='btn login-btn' onClick={handleLogin}>Login</Button>
                  <div className='text-end color-dary-gray'>Don't have account ?
                    <Link to='/register' className='color-primary'> Create Account</Link>
                  </div>
                  <div className='text-end'>
                    <Link to='/login' className='color-dary-gray'>Forgot Password?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default LoginIn