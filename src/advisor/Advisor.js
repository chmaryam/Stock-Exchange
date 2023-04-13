import React from 'react'
export default function Advisor(props) {
  return (
    <>
    <td>{props.name}</td>
    <td>{props.emailAddress}</td>
    <td>{props.phoneNumber}</td>
    <td><button onClick={() => {props.editView(props._id)}}>Edit</button></td>
    <td><button onClick={() => {props.deleteAdvisor(props._id)}}>Delete</button></td>
    </>
  )
}