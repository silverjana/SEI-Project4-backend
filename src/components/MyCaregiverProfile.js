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
        {info.bio && <p>About: {info.bio}</p>}
        {info.education && <p>Education: {info.education}</p>}
        <p>Email: {userData.email}</p>
        <p>You joined on {since}</p>
      </Box>
      <Box>

      </Box>
    </Container>
  )
}

export default MyCaregiverProfile