import { Container, Button, Box } from '@mui/material'

const MyPatientProfile = ({userData}) => {
  const {content_object: info} = userData

  const date = userData.date_joined
  //console.log(typeof date)
  const since = date.split('T')[0]

  return(
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
      <Button className='navigatebtn' href='/'>Click here to go back to home</Button>


      </Box>
    </Container>
  )
}

export default MyPatientProfile