import React, { useState } from 'react'
import { Button, Col, Input, Row } from 'reactstrap'
import loginSide from '../assets/images/medical-lab.jpg'
import { Link } from 'react-router-dom'
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Register = () => {

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

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
                <p>Login to Labs Monitoring System</p>
              </div>
              <div className='form '>
                <div class="coolinput">
                  <label for="input" class="text">User Name</label>
                  <Input className='input-field' type="text" name="input" class="input" value={userName} onChange={(e) => setUserName(e.target.value)} />

                </div>
                <div class="coolinput">
                  <label for="input" class="text">Email ID</label>
                  <Input className='input-field' type="email" name="input" class="input" value={email} onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div class="coolinput">
                  <label for="input" class="text">Password</label>
                  <Input className='input-field' type={show ? 'text' : 'password'} name="input" class="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                  {show ? <AiFillEye size={20} className='eye-btn' onClick={() => setShow(!show)} /> : <AiOutlineEyeInvisible size={20} className='eye-btn' onClick={() => setShow(!show)} />}
                </div>
                <div className='my-3'>
                  <Button className='btn login-btn'>Login</Button>
                  <div className='text-end'>
                    <Link to='/register' className='color-dary-gray'>Forgot Password?</Link>
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