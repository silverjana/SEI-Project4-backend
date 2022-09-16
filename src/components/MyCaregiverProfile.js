import { Container, Button, Box } from '@mui/material'
import { LinearProgress } from '@mui/material'
import { Card } from 'react-bootstrap'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useState } from 'react'

const MyCaregiverProfile = ({ userData }) => {
  const { content_object: info } = userData
  const date = userData.date_joined
  console.log('info', info)
  const since = date.split('T')[0]

  //! assign carer to task
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const onAssign = async (event) => {
    event.preventDefault()
    const taskId = event.target.value
    console.log(taskId)
    try {
      // API request -> Put req
      const res = await axios.put(`http://127.0.0.1:8000/tasks/assign/${taskId}/`, null)
      //save the response
      setMessage(res.data)
      console.log(" res ", res.data)

      function refreshPage() {
        window.location.reload();
      }
      refreshPage()

    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }


  return (
    <section className='myProfile'>
      <h2>Welcome {info.name}!</h2>
      
      {info.image && <img src={info.image} loading="lazy" alt='profile' />  }
      
      <Box>
        <h4>About you:</h4>
        <p>{info.qualification} - {info.specialization} </p>
        <p>Location: {info.location}</p>
        {info.bio && <p>About: {info.bio}</p>}
        {info.education && <p>Education: {info.education}</p>}
        <p>Email: {userData.email}</p>
        <p>You joined on {since}</p>
      </Box>
      <Box>
        <h4>Tasks requests:</h4>
        {info.proposed_tasks.length > 0 ?
          <>
            {info.proposed_tasks.map(task => {
              const { id, start_date, status, frequency, treatment } = task
              return (
                id
                  ?
                  <div className='propTaskDiv' key={id}>
                    <Link to={`/tasks/${info.id}/${id}`} >
                      <Card className="my-tasks-card">
                        <Card.Body>
                          <Card.Title className="card-title">{status} Task: {treatment}</Card.Title>
                          <Card.Text className="card-text">When: {frequency} starting from {start_date} <br /> <span>Click for more</span> </Card.Text>
                          <button className='taskbtn' value={id} onClick={onAssign}>Accept task</button>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                  :
                  <LinearProgress color="success" />
              )
            })}
          </>
          :
          <p>There are no tasks to show</p>
        }
      </Box>
      <Box>
        <h4>Assigned tasks:</h4>
        {info.assigned_tasks ?
          <>
            {info.assigned_tasks.map(task => {
              const { id, start_date, status, frequency, treatment } = task
              return (
                id
                  ?
                  <div className='asTaskDiv' key={id}>
                    <Link to={`/tasks/${info.id}/${id}`} >
                      <Card className="my-tasks-card">
                        <Card.Body>
                          <Card.Title className="card-title">{status} Task: {treatment}</Card.Title>
                          <Card.Text className="card-text">When: {frequency} starting from {start_date} <br /> 
                          <span>Click for more</span> </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>

                  :
                  <LinearProgress color="success" />

              )
            })}
          </>
          :
          <p>There are no tasks to show</p>
        }
        {/* <Button className='oksubmit' href='/'>Click here to go back to home</Button> */}

      </Box>
    </section>
  )
}

export default MyCaregiverProfile