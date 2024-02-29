import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImg from '../assets/image2.jpg'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'

function Home() {
  const [homeProject, setHomeProject] = useState([])
  const [isLoggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoggedIn(true)
    }
  }, [])
  const getHomeProject = async () => {
    const result = await homeProjectAPI();
    console.log(result);
    setHomeProject(result.data)
  }
  useEffect(() => {
    getHomeProject();
  }, [])
  return (
    <>
      <div className='mb-5 bg-success' style={{ width: '100%', height: '80vh' }}>
        <div className='container-fluid rounded'>
          <Row className='text-align-items-center p-5'>
            <Col sm={12} md={6} lg={6}>
              <h2 className='text-light mb-3' style={{ fontSize: '70px', fontWeight: '600' }}>Project Fair</h2>
              <p>One stop destination for all web application projects</p>
              {
                isLoggedIn ?
                  <Link to={'/dashboard'}>
                    <button className='btn btn-dark text-light rounded mt-3'>Manage Projects</button>
                  </Link>
                  :
                  <Link to={'/login'}>
                    <button className='btn btn-dark text-light rounded mt-3'>Get Started</button>
                  </Link>
              }
            </Col>
            <Col sm={12} md={6} lg={6}>
              <img src={titleImg} alt="" height={'450px'} style={{ marginTop: '50px' }} />
            </Col>
          </Row>
        </div>
      </div>
      <div className='mt-5 all-project'>
        <div className='text-center'>
          <h1>Explore Our Projects</h1>
          <marquee scrollAmount={12}>
            <div className='d-flex mt-5 mb-5'>
              {
                homeProject.length > 0 ?
                  homeProject.map((item) => (
                    <div className='ms-5' style={{ width: '400px' }}>
                      <ProjectCard project={item} />
                    </div>
                  )) :
                  <p className='text-danger'>No projects to load</p>
              }
            </div>
          </marquee>
          <div className='text-center mt-5 mb-3'>
            <h6 ><Link className='text-success' to={'/project'}>
              See More Projects</Link></h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home