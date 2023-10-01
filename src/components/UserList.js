import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Row, Spinner, Table } from 'reactstrap'
import { GrAdd } from 'react-icons/gr';
import { BsEye } from 'react-icons/bs';
import { BiFilterAlt } from 'react-icons/bi';
import { PiMagnifyingGlass } from 'react-icons/pi';
import axios from 'axios';
import UserDetails from './UserDetails';
import { useNavigate } from 'react-router-dom';
import Loan from './Loan';

const UserList = () => {

  const [data, setData] = useState([])
  const [userData, setUserData] = useState([])
  const [searchVal, setSearchVal] = useState('')
  const [userId, setUserId] = useState()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();


  const getUserData = async () => {
    try {
      await axios.get('https://dummyjson.com/users').then((resp) => {
        setData(resp.data.users)
        setUserData(data)
        setLoading(false)
        console.log(resp.data.users)
      })
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  //   function handleSearchClick() {
  //     if (searchVal === "") { setProducts(productList); return; }
  //     const filterBySearch = productList.filter((item) => {
  //         if (item.toLowerCase()
  //             .includes(searchVal.toLowerCase())) { return item; }
  //     })
  //     setProducts(filterBySearch);
  // }

  const handleSearch = (e) => {
    setSearchVal(e.target.value)
    if (searchVal === '') { setUserData(data); return; }
    const filterData = userData.filter((item) => {
      if (item.toLowerCase().includes(searchVal.toLocaleLowerCase())) {
        return item
      }
    })
    setUserData(filterData)
  }

  console.log(userId)
  console.log(searchVal)
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
                  <Loan />
                </div>
              </div>
            </Col>
          </Row>
          <Row className='w-100'>
            <Col lg={5} md={6} sm={12}>
              <div className='d-flex align-items-center position-relative'>
                <PiMagnifyingGlass className='search-icon' size={20} />
                <Input className='search-field' type='text' placeholder='Search' value={searchVal} onChange={(e) => handleSearch(e)} />
                <div className='d-flex align-items-center mx-2'>
                  <BiFilterAlt className='mx-2' /> <span className='color-dary-gray'>Filter</span>
                </div>
              </div>
            </Col>
          </Row>
          <Row className='w-100 my-3'>
            <Col xs={12}>
              {data && data ? <>
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
                    {data && data.map((curElm) => {
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
                {loading ? <div className='text-center'><Spinner
                  className="m-5"
                  color="primary"
                >
                  Loading...
                </Spinner></div> : <></>}
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