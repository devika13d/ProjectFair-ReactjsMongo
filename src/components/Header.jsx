import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from './context/ContextShare';

function Header({ dashboard }) {
  const isDashboard = dashboard ? true : false;
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('existingUser')
    setIsAuthToken(false)
    navigate('/')
  }
  return (
    <>
      <Navbar className="bg-success p-3" >
        <Container >
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Navbar.Brand className='text-light'>
              <i class="fa-brands fa-stack-overflow me-3 ms-5 text-light"></i>
              Project Fair
            </Navbar.Brand>
          </Link>
          {
            isDashboard &&
            <button className=' btn btn-warning rounded' onClick={handleLogout}>Log Out</button>
          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header