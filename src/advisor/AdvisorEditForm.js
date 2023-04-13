import React, {useState} from 'react'

export default function AdvisorEditForm(props) {
    
  const [advisor, setAdvisor] = useState(props.advisor)

  const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value

    const updatedAdvisor = {...advisor}
    updatedAdvisor[attributeToChange] = newValue
    console.log(updatedAdvisor)
    setAdvisor(updatedAdvisor)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.editAdvisor(advisor);
  }

  return (
    <div className='form-box'>
        <h1>Update</h1>

        <form onSubmit={handleSubmit}>
            <div className='field1'>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} value={advisor.name}></input>
            </div>

            <div>
                <label>Email Address</label>
                <input type="email" name="emailAddress" onChange={handleChange} value={advisor.emailAddress}></input>
            </div>

            <div>
                <label>Phone Number</label>
                <input type="number" name="phoneNumber" onChange={handleChange}  value={advisor.phoneNumber}></input>
            </div>

            <div>
              <div className='submit'>
                <input type="submit" value="Update" onClick={handleSubmit}></input>
              </div>  
            </div>
        </form>
    </div>
  )
}