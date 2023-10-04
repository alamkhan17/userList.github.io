import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Row } from 'reactstrap'
import loginSide from '../assets/images/medical-lab.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Register = () => {

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [validEmail, setValidEmail] = useState(true)
  const [validPassword, setValidPassword] = useState(true)
  const navigate = useNavigate();

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  var users = localStorage.getItem('users');
  if (users === undefined || users === null) {
    users = [];
  } else {
    users = JSON.parse(users)
  }
  const handleSubmit = () => {
    if (!validEmail && !validPassword && email !== '' && password.length >= 6) {
      const user = { userName, email, password }
      users.push(user)
      localStorage.setItem('users', JSON.stringify(users));
      console.log(users)
      navigate('/user-list')
    } else {
      setValidPassword(false)
      setValidEmail(false)
    }
  }

  const handleEmail = (value) => {
    setEmail(value)
    if (emailRegex.test(value)) {
      setValidEmail(true)
    } else {
      setValidEmail(false)
    }
  }
  const handlePassword = (value) => {
    setPassword(value)
    if (value.length >= 6) {
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
  }
  // useEffect(() => {
  //   if (emailRegex.test(email)) {
  //     setValidEmail(false)
  //   } else if (password.length < 6) {
  //     setValidPassword(false)
  //   }
  // }, [email, password])


  return (
    <div className='register w-100'>
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
                <p>Register to Labs Monitoring System</p>
              </div>
              <div className='form '>
                <div className="coolinput">
                  <label htmlFor="name" className="text">User Name</label>
                  <Input id='name' className='input-field input' type="text" name="input" value={userName} onChange={(e) => setUserName(e.target.value)} />

                </div>
                <div className="coolinput">
                  <label htmlFor="email" className="text">Email ID</label>
                  <Input id='email' className='input-field input' type="email" name="input" value={email} invalid={!validEmail} onChange={(e) => handleEmail(e.target.value)} />
                  {!validEmail ? <div> <span>Enter valid Email</span> </div> : <></>}
                </div>
                <div className="coolinput">
                  <label htmlFor="password" className="text">Password</label>
                  <Input id='password' className='input-field input' type={show ? 'text' : 'password'} name="input" value={password} invalid={!validPassword} onChange={(e) => handlePassword(e.target.value)} />
                  {show ? <AiFillEye size={20} className='eye-btn' onClick={() => setShow(!show)} /> : <AiOutlineEyeInvisible size={20} className='eye-btn' onClick={() => setShow(!show)} />}
                  {!validPassword ? <div> <span>Password must be more then 6 digit</span> </div> : <></>}
                </div>
                <div className='my-3'>
                  <Button className='btn login-btn' onClick={handleSubmit}>Register</Button>
                  <div className='text-end color-dary-gray'> Already  have account ?
                    <Link to='/login' className='color-primary'> Login</Link>
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

export default Register