import { Container, Button, Box } from '@mui/material'
import axios from 'axios'
import { useEffect } from 'react'
import {LinearProgress} from '@mui/material'
import { Card } from 'react-bootstrap'
import { Link } from "react-router-dom"

const MyPatientProfile = ({ userData }) => {
  const { content_object: info } = userData
  console.log('INFO: ', info)
  const date = userData.date_joined
  //console.log(typeof date)
  const since = date.split('T')[0]

  useEffect(() => {
    console.log('useEffect info ', userData)
  })

  //delete Task
  const deleteTask = async (taskId) => {
    console.log('hits delete')

    try {
      
      await axios.delete(`http://127.0.0.1:8000/tasks/${taskId}`)

      function refreshPage() {
        window.location.reload();
      }
      refreshPage()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <h2>Welcome {info.name}!</h2>
      <Box>
        <h3>About you:</h3>
        <p>{info.date_of_birth} - {info.gender} </p>
        <p>Location: {info.location}</p>
        {info.health_status && <p>Health status: {info.health_status}</p>}
        {info.allergies && <p>Allergies: {info.allergies}</p>}
        {info.contact && <p> Additional contact: {info.contact}</p>}
        {info.emergency_contact && info.em_contact_relationship && <p>Emergency contact: {info.em_contact_relationship}: {info.emergency_contact}</p>}
        <p>Email: {userData.email}</p>
        <p>You joined on {since}</p>
      </Box>

      <Box>
        <h3>Your Tasks:</h3>
        {info.tasks.length > 0
          ?
          <>
            {info.tasks.map(task => {
              const {id, start_date, status, frequency, treatment} = task
              return (
                id 
                ?
                <div className='taskDiv' key={id}>
                <Link to={`/tasks/${info.id}/${id}`} >
                  <Card className="my-tasks-card">
                    <Card.Body>
                      <Card.Title className="card-title">{status} Task: {treatment}</Card.Title>
                      <Card.Text className="card-text">When: {frequency} starting from {start_date} <br /> <span>Click for more</span> </Card.Text>
                      
                    </Card.Body>
                  </Card>
                </Link>
                <button className='deletebtn' onClick={() => deleteTask(id)}>delete this task</button>
                </div>
                
                :
                <LinearProgress color="success" />
              
              )
            })}

            <Button className='deletebtn' onClick={deleteTask}>delete task - send taskId</Button>
          </>
          :
          <p>There are no tasks to show</p>
        }

        <Button className='navigatebtn' href={`${info.id}/tasks`}>Create new task</Button> 
        {/* Create new task with patient id! */}


      </Box>
    </Container>
  )
}

export default MyPatientProfile