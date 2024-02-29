import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Profile from '../components/Profile'
import Header from '../components/Header'
import Myprojects from '../components/Myprojects'

function Dashboard({ }) {
  const [userName, setUserName] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem('existingUser')) {
      const existingUserData = (JSON.parse(sessionStorage.getItem('existingUser')))
      //  console.log(existingUserData);
      setUserName(existingUserData.username)
    }
  }, [])
  return (
    <>

      <Header dashboard={"dashboard"}  />
      <h2 className='mt-5 ms-3'>Welcome <span style={{ color: 'orangered' }}>{userName}!!</span></h2>
      <Row>
        <Col md={8} lg={8}>
          <Myprojects />
        </Col>
        <Col md={4} lg={4}>
          <Profile />
        </Col>
      </Row>
    </>
  )
}

export default Dashboard