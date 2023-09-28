import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Row, Table } from 'reactstrap'
import { GrAdd } from 'react-icons/gr';
import { BsEye } from 'react-icons/bs';
import { BiFilterAlt } from 'react-icons/bi';
import { PiMagnifyingGlass } from 'react-icons/pi';
import axios from 'axios';
import UserDetails from './UserDetails';

const UserList = () => {

  const [userData, setUserData] = useState([])
  const [search, setSearch] = useState('')
  const [userId, setUserId] = useState()
  const [show, setShow] = useState(false)

  const getUserData = async () => {
    await axios.get('https://dummyjson.com/users').then((resp) => {
      setUserData(resp.data.users)
      console.log(resp.data.users)
    })
  }

  useEffect(() => {
    getUserData()
  }, [])

  console.log(userId)
  return (
    <>
      <div className='user-list py-5'>
        <div className='container'>
          <Row className='w-100'>
            <Col xs={12}>
              <div className='d-flex justify-content-between'>
                <div>
                  <h3 className='color-primary fw-400'>Users</h3>
                  <p className='color-primary'>Here are all the users for this project</p>
                </div>
                <div>
                  <Button className='btn add-user-btn'><GrAdd className='color-primary' color='color-primary' /> Add User</Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row className='w-100'>
            <Col lg={5} md={6} sm={12}>
              <div className='d-flex align-items-center'>
                <PiMagnifyingGlass className='search-icon' size={25} />
                <Input className='search-field' type='text' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className='d-flex align-items-center mx-2'>
                  <BiFilterAlt className='mx-2' /> <span className='color-dary-gray'>Filter</span>
                </div>
              </div>
            </Col>
          </Row>
          <Row className='w-100 my-3'>
            <Col xs={12}>
              {userData && userData ? <>
                <Table className='user-table' responsive>
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Name</td>
                      <td>Gender</td>
                      <td>Email</td>
                      <td>phone</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {userData && userData.map((curElm) => {
                      const { firstName, id, gender, email, phone, eyeColor, image } = curElm
                      return (
                        <tr>
                          <td style={{ borderLeft: `5px solid ${eyeColor}` }}>{id}</td>
                          <td className='color-primary'><div className='d-flex align-items-center'> <img className='tbl-profile-image' src={image} alt='profile' /> {firstName}</div></td>
                          <td>{gender}</td>
                          <td>{email}</td>
                          <td>{phone}</td>
                          <td> <BsEye className='edit-icon' size={25} onClick={() => {
                            setUserId(id)
                            setShow(true)
                          }} /> </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                <p className='color-dary-gray'>Showing {userData && userData ? 1 : 0}-{userData && userData.length} of {userData && userData.length}</p>
              </> : <div className='text-center'>No Data Found</div>}
              {userId && userId ? <UserDetails id={userId} setShow={setShow} show={show} /> : <></>}
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default UserList