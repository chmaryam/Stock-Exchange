import React, { useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
// import {SignIn, SignUp} from 'reactbootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';




import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


// footer
import Card from 'react-bootstrap/Card';





// // import Nav from 'react-brap/Nav';
// // import Navbar from 'react-bootstrap/Navbar';

import './App.css'

// Imported Components
import SignUp from './user/SignUp'
import SignIn from './user/SignIn'
import Stock from './stock/Stock';
import AdvisorList from './advisor/AdvisorList';

import Home from './home/Home'




export default function App() {

  const [isAuth,setIsAuth] = useState(false)
  const [user,setUser] = useState({})

  const navigate = useNavigate()

  const date = new Date()
  const currentYear = date.getFullYear()

=======

  useEffect(() => {
    let token = localStorage.getItem("token")
    if(token != null) {
      let user = jwt_decode(token)

      if(user){
        setIsAuth(true)
        setUser(user)
      } else if (user){
        localStorage.removeItem("token")
        setIsAuth(false)
      }
    }
  }, [])

  const registerHandler = (user) => {
    Axios.post("auth/signup",user)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const loginHandler = (cred) => {
    Axios.post("auth/signin", cred)
    .then(res => {
      // save the token into local storage
      let token = res.data.token
      if(token != null){
        // "key",value
        localStorage.setItem("token", token)
        let user = jwt_decode(token)
        setIsAuth(true)
        setUser(user)
      }
    })
    .catch(err => {
      console.log(err)
    })
    
  }
  const logoutHandler = (e) => {
    console.log("logout handler")
    e.preventDefault()
    localStorage.removeItem("token")
    setIsAuth(false)
    setUser(null)
    let path = "/"
    navigate(path)
  }

  
 console.log(isAuth)

  return (
    <>
        <Router>

        <div>

          <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand className='navbar-b' >
              <Nav.Link as={Link} to="/">Stock Market</Nav.Link>
            </Navbar.Brand>
            <Nav className="me-auto">
          
              {isAuth ? (
                <>
                  <Nav.Link as={Link} to="/stock">Market</Nav.Link>
                  <Nav.Link as={Link} to="/advisors">Advisors</Nav.Link>
                  <Nav.Link as={Link} to="/logout" onClick={logoutHandler}>Log Out</Nav.Link>
=======
          <nav>
            <div>
              <nav>
              <Link to="/">Home</Link> &nbsp;
              {isAuth ? (
                <>
                  <Link to="/" onClick={logoutHandler}>Logout</Link>&nbsp;

                </>
            ): (
                <>
                  <Link to='/signin'>Sign In</Link>&nbsp;
                  <Link to='/signup'>Sign Up</Link>&nbsp;
                </>
            )}
              </nav>
            </div>
          </nav>
        </div>

        <div>
          <Routes>
              <Route path="/" element={<Home/>}/>

                <Route path="/signup" element={
                  isAuth ?
                  <Home/>
                  :
                <SignUp register={registerHandler} />}/>
                <Route path="/signin" element={
                  isAuth ?
                  <Home/>
                  :
                  <SignIn login={loginHandler} style={{padding: 4}}/>}/>
                  
                  {isAuth ? (
                    <>
                      <Route path='/stock' element={<Stock/>}/>
                      <Route path='/advisors' element={<AdvisorList/>}/>
                    </>
                  ) : (
                    <>
                    </>
                  )}
                </Routes>
              
              {/* <Card id="footer">
          <Card.Footer >
            <small  style={{color: 'whitesmoke' , marginLeft: 600 , postition: 'relative' ,
          fontFamily: 'serif' , fontSize: 15
          }}>Copy Rights Reserved 2023</small>
          </Card.Footer>
              </Card> */}
              <footer>
                <small>
                  Copyright &copy; {currentYear} Stock Market, All Rights Reserved
                </small>
              </footer>
        </div>      
=======

              <Route path="/signup" element={
                isAuth ? 
                <Home/>
                :
              <SignUp register={registerHandler} />}/>

              <Route path="/signin" element={
                isAuth ?
                // <Route path="/" element={<Home/>}/>
                <Home/>
                :
                <SignIn login={loginHandler}/>}/>

            

  )
}



