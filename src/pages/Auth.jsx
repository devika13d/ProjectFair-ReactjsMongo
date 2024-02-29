import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { NavLink, useNavigate } from 'react-router-dom';
import img from '../assets/image1.jpg';
import { Form } from 'react-bootstrap';
import { loginAPI, registerAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../components/context/ContextShare';


function Auth({ register }) {
  const {isAuthToken, setIsAuthToken}=useContext(isAuthTokenContext)
  const registerForm = register ? true : false;
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      alert('Please fill the form completely!');
    } else {
      const result = await registerAPI(userData);
      console.log(result);
      if (result.status === 200) {
        alert('User registered successfully');
        setUserData({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      } else {
        alert(result.response.data);
      }
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      alert('Please fill the form completely');
    } else {
      const result = await loginAPI(userData);
      console.log(result);

      if (result.status === 200) {
        console.log(result);
        sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser))
        sessionStorage.setItem('token', result.data.token)
        setIsAuthToken(true)
        alert('User logged in successfully');
        setUserData({
          email: "",
          password: ""
        });
        navigate('/');
      } else {
        alert(result.response.data)
      }
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100%' }}>
        <div className='w-75 container'>
          <NavLink to={'/'} className='text-success' style={{ textDecoration: 'none' }}>
            <i className='fa-solid fa-arrow-left text-warning me-2 m-3'></i>
            Back To Home
          </NavLink>
          <div className='card bg-success p-5'>
            <div className='row align-items-center'>
              <div className='col-lg-6 col-md-6'>
                <img src={img} alt="image1" width={'100%'} />
              </div>
              <div className='col-lg-6 col-md-6 p-3'>
                <div className='d-flex align-items-center flex-column'>
                  <h2 className='text-light'>
                    <i className="fa-brands fa-stack-overflow me-2 text-light"></i>
                    Project Fair
                  </h2>
                  <h5>
                    {registerForm ? "Sign Up Your Account" : "Sign into Your Account"}
                  </h5>
                  <Form>
                    {registerForm &&
                      <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          value={userData.username}
                          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                          type="text"
                          placeholder="Username"
                        />
                      </Form.Group>
                    }
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        type="email"
                        placeholder="Email"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                  </Form>
                  {registerForm ?
                    <div>
                      <button className='btn btn-warning ms-5 mt-3 rounded m-3' onClick={handleRegister}>Register</button>
                      <p>Already a user? Click here to <NavLink to={'/login'} style={{ textDecoration: 'none', color: 'orangered' }}>Login</NavLink></p>
                    </div> :
                    <div>

                      <button className='btn btn-warning ms-5 mt-3 rounded m-3' onClick={handleLogin}>Login</button>

                      <p>Not a user yet? Click here to <NavLink to={'/register'} style={{ textDecoration: 'none', color: 'orangered' }}>Register</NavLink></p>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
