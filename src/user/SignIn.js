import React, { useState } from 'react'
import {Container,Form,Button} from "react-bootstrap"


export default function SignIn(props) {

    const [newUser,setNewUser] = useState({})

    const ChangeHandler = (e) => {
        const user = {...newUser}
        user[e.target.name] = e.target.value
        setNewUser(user)
        console.log(user)
    }

    const loginHandler = () => {
        props.login(newUser)
    }
  return (
    <div>
        <h1>Sign in</h1>
    <Container >
        <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control name="emailAddress" onChange={ChangeHandler}/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" onChange={ChangeHandler}/>
        </Form.Group>

        <Button variant="primary" onClick={loginHandler} style={{marginTop: 15}}  >
            Login
        </Button>
    </Container>
    </div>
  )
}
