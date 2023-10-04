import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Badge, Col, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Spinner } from 'reactstrap'
import { BiUserCircle } from 'react-icons/bi';
import { BsFileBarGraph } from 'react-icons/bs';

const UserDetails = ({ id, show, setShow }) => {

    const [data, setData] = useState([])

    const getData = async () => {
        try {
            await axios.get(`https://dummyjson.com/users/${id}`).then((res) => {
                setData(res.data)

            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getData()
    }, [id])
    console.log(data)
    return (
        <div>
            <Offcanvas
                direction="end"
                scrollable
                toggle={() => {
                    setShow(!show)
                    setData([])
                }}
                isOpen={show}
            >
                <OffcanvasHeader toggle={() => {
                    setShow(!show)
                    setData([])
                }}>
                    <h4 className='color-dary-gray fw-400 pt-3'>User Details</h4>
                </OffcanvasHeader>
                <OffcanvasBody className='detail-drawer'>
                    {data && data ? <>
                        <Row className='w-100 border-bottom pb-3'>
                            <Col xs={4}>
                                <img className='profile-image' src={data.image} alt='profileimage' />
                            </Col>
                            <Col xs={8} className='d-flex align-items-center'>
                                <div>
                                    <p className='p-0 m-0 color-primary'><strong>{data.firstName}</strong></p>
                                    <span className='color-dary-gray'>{data.username}</span>
                                    <div>
                                        <Badge
                                            color="primary"
                                            pill
                                            className='py-2 px-4'
                                        >
                                            {data.gender}
                                        </Badge>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className='w-100 border-bottom py-2'>
                            <Col xs={12}>
                                <div className='d-flex align-items-center mb-3'>
                                    <div className='d-flex justify-content-center align-items-center user-icon'>
                                        <BiUserCircle className='icon' size={25} />
                                    </div>
                                    <p className='m-0 mx-3 color-primary'>Basic & account details</p>
                                </div>
                                <div>
                                    <p className='m-0 mx-1 color-primary fw-bold'>{data.firstName} {data.maidenName} {data.lastName}</p>
                                    <span className='color-dary-gray mx-1'>Full Name</span>
                                </div>
                                <div className='mt-3'>
                                    <p className='m-0 mx-1 color-primary fw-bold'>{data.phone}</p>
                                    <span className='color-dary-gray mx-1'>Mobile Number</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className='w-100 border-bottom py-2'>
                            <Col xs={12}>
                                <div className='d-flex align-items-center mb-3'>
                                    <div className='d-flex justify-content-center align-items-center user-icon'>
                                        <BsFileBarGraph className='icon' size={25} />
                                    </div>
                                    <p className='m-0 mx-3 color-primary'>User Data</p>
                                </div>
                                <div>
                                    <p className='m-0 mx-1 color-primary fw-bold'>{data.birthDate}</p>
                                    <span className='color-dary-gray mx-1'>Birth Date</span>
                                </div>
                                <div>
                                    <p className='m-0 mx-1 color-primary fw-bold'>{data.bloodGroup}</p>
                                    <span className='color-dary-gray mx-1'>Blood Group</span>
                                </div>
                                <div>
                                    <p className='m-0 mx-1 color-primary fw-bold'>{data.age}</p>
                                    <span className='color-dary-gray mx-1'>Blood Age</span>
                                </div>
                            </Col>
                        </Row>
                    </> : <Spinner
                        className="m-5"
                        color="primary"
                    >
                        Loading...
                    </Spinner>}
                </OffcanvasBody>
            </Offcanvas>
        </div>
    )
}

export default UserDetails