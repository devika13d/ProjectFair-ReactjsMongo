import './App.css';
import Footer from './components/Footer';
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { isAuthTokenContext } from './components/context/ContextShare';

function App() {
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)
  useEffect(() => {
    const tn = sessionStorage.getItem('token')
    if (tn) {
      setIsAuthToken(tn)
    }
  }, [isAuthToken])
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register={'register'} />} />
        <Route path='/project' element={<Project />} />
        <Route path='/dashboard' element={isAuthToken ? <Dashboard /> : <Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
