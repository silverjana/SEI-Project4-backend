import { Container, Button, Box } from '@mui/material'

const MyCaregiverProfile = ({userData}) => {
  const {content_object: info} = userData
  const date = userData.date_joined
  //console.log(typeof date)
  const since = date.split('T')[0]

  return(
    <Container>
      <h2>Welcome {info.name}!</h2>
      <Box>
        <h3>About you:</h3>
        <p>{info.qualification} - {info.specialization} </p>
        <p>Location: {info.location}</p>
        {info.bio && <p>About: {info.bio}</p>}
        {info.education && <p>Education: {info.education}</p>}
        <p>Email: {userData.email}</p>
        <p>You joined on {since}</p>
      </Box>
      <Box>
        <h3>your Tasks</h3>
        <Button className='navigatebtn' href='/'>Click here to go back to home</Button>
      </Box>
    </Container>
  )
}

export default MyCaregiverProfile