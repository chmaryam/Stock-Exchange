import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import Advisor from './Advisor';
import AdvisorCreateForm from './AdvisorCreateForm';
import AdvisorEditForm from './AdvisorEditForm';

export default function AdvisorList() {

    const [advisors, setAdivsors] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentAdvisor, setCurrentAdvisor] = useState("");

    useEffect(() => {
        loadAdvisorsList();
    }, [])

    const loadAdvisorsList = () => {
        Axios.get("advisor/index")
        .then((response) => {
          console.log(response)
          // State to store the data
          setAdivsors(response.data.advisors)
        })
        .catch((err) => {
          console.log("Error Retreiving Advisors")
          console.log(err)
        })
    }
    const addAdvisor = (advisor) => {
        Axios.post("advisor/create", advisor,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        )
        .then(res => {
            console.log("Advisor Added Successfully!!!")
            loadAdvisorsList();
        })
        .catch(err => {
            console.log("Error Adding Advisor")
            console.log(err)
        })
    }
    const editView = (id) => {
        Axios.get(`advisor/edit?id=${id}`,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res.data.advisor)
            let advisor = res.data.advisor
            console.log("Loaded Author Information")
            setIsEdit(true)
            setCurrentAdvisor(advisor)
        })
        .catch(err => {
            console.log("Error Loading Author Information")
            console.log(err)
        })
    }

    const editAdvisor = (advisor) => {
        Axios.put("advisor/update", advisor,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log("Author Updated Successfully!!!")
            console.log(res);
            loadAdvisorsList();
        })
        .catch( err=> {
            console.log("Error Editing Advisor")
            console.log(err)
        })
    }

    const deleteAdvisor = (id) => {
        Axios.delete(`advisor/delete?id=${id}`,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log("Record Delete Successfully!!!")
            console.log(res)
            loadAdvisorsList();
        })
        .catch(err => {
            console.log("Error Deleting Advisor")
            console.log(err)
        })
    }
    const allAdvisors = advisors.map((advisor, index) => (
        <tr key={index}>
            <Advisor {...advisor} editView={editView} deleteAdvisor={deleteAdvisor}/>
        </tr>
    ))

  return (
    <div className='advisor-list'>
        <h1>Advisors List</h1>
        <div>
            <table>
                <tbody>
                    <tr>
                    <th>Name</th>
                    <th>EmailAddress</th>
                    <th>Number</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                    {allAdvisors}
                </tbody>
            </table>
        </div>
        <div className=''>
        {(!isEdit) ? 
         <AdvisorCreateForm addAdvisor={addAdvisor}/>
        :
        <AdvisorEditForm key={currentAdvisor._id} advisor={currentAdvisor} editAdvisor={editAdvisor}/>
        }
        </div>
    </div>
  )
}