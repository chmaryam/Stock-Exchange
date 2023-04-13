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

import Home from './home/Home'




export default function App() {

  const [isAuth,setIsAuth] = useState(false)
  const [user,setUser] = useState({})
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [apiSymbol, setApiSymbol] = useState("IBM")

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

    // Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=7URDWPHHFLX445FN`)
    //   .then((response) => {
    //     setData(response.data);
    //     console.log(response.data["Meta Data"])
    //     console.log(response.data["Meta Data"]["2. Symbol"])
    //     console.log(response.data["Time Series (Daily)"])
    //   })
    //   .catch((error) => {
    //     setError(error);
    //   });

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
      console.log(res.data.token)
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
  }

  
 console.log(isAuth)

  return (
    <>
        <Router>

        <div>
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
                // <Route path="/" element={<Home/>}/>
                <Home/>
                :
                <SignIn login={loginHandler}/>}/>
=======
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Stock Exchange</Navbar.Brand>
          <Nav className="me-auto">
            
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/signup">signup</Nav.Link>
            <Nav.Link as={Link} to="/signin">Signin</Nav.Link>
            <Nav.Link as={Link} to="/logout" onClick={logoutHandler}>logout</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
          <Routes>
              {/* <Route path="/"/> */}
              <Route path="/signup" element={<SignUp register={registerHandler} />}/>

              <Route path="/signin" element={<SignIn login={loginHandler}></SignIn>}   style={{padding: 4}}/>

              </Routes>
            </Router>
            
    <Card id="footer">
        <Card.Footer >
          <small  style={{color: 'whitesmoke' , marginLeft: 600 , postition: 'relative' ,
        fontFamily: 'serif' , fontSize: 17 
        }}>Copy Rights Reserved 2023</small>
        </Card.Footer>
    </Card>
            </>
            
  )
}



