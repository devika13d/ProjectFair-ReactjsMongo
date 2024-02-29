import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectsAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'

function Project() {
  const [isToken, setIsToken] = useState(false)
  const [searchkey, setSearchKey] = useState("")
  const [allproject, setAllProject] = useState([])
  const getAllProjects = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllProjectsAPI(searchkey, reqHeader)
      console.log('result for all projects', result);
      setAllProject(result.data)
    }
  }
  useEffect(() => {
    getAllProjects();
  }, [searchkey])
  console.log(searchkey);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setIsToken(true)
    }
  })
  return (
    <>
      <Header />
      <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
        <h2>All Projects</h2>
        <div className='mt-5 w-25 d-flex '>
          <input type="text" className='form-control'
            onChange={(e) => setSearchKey(e.target.value)} placeholder='Search Project using technology' />
          <i class='fa-solid fa-magnifying-glass fa-rotate-90' style={{ marginLeft: '-45px' }}></i>
        </div>
      </div>
      <Row className='m-5'>
        {
          allproject.length > 0 ?
            allproject.map((item) => (
              <Col sm={12} lg={4} md={4}>
                <ProjectCard project={item} />
              </Col>
            )) :
            <div>
              {
                isToken ?
                  <p className='text-danger'>No projects uploaded yet!</p>
                  :
                  <div className='d-flex justify-content-center align-items-center flex-column'>
                    <img src="https://th.bing.com/th/id/R.87e87fa8cb1c4d332a64470d5c3acd89?rik=vuWahGaWKYN5CQ&riu=http%3a%2f%2fdli-eduventure.um.ac.id%2fassets%2fimg%2flogin.png&ehk=hPJNQY6rdxBzsCPJa9ahwTJgf6KEPNQdNr1lfqo1NTk%3d&risl=&pid=ImgRaw&r=0" height={'300px'} width={'300px'} alt="" />
                    <p className='text-danger fs-4'>Please <Link style={{ textDecoration: 'none' }} to={'/login'}> Login</Link> to view projects!</p>
                  </div>
              }
            </div>

        }

      </Row>
    </>
  )
}

export default Project