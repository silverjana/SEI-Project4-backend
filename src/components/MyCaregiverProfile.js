import { Container, Button, Box } from '@mui/material'

const MyCaregiverProfile = ({userData}) => {
  const {content_object: info} = userData
  const date = userData.date_joined
  //console.log(typeof date)
  const since = date.split('T')[0]

  console.log('caregiverInfo: ', info)


  return(
    <Container>
      <h2>Welcome {info.name}!</h2>
      <Box>
      <img src={info.image} loading="lazy" alt='profile' />
      </Box>
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
        {/* {info.proposed_tasks.length> 0 ?
        <p>show tasks</p>
        :
        <p>There are no tasks to show</p>
        } */}
        <Button className='navigatebtn' href='/'>Click here to go back to home</Button>

      </Box>
    </Container>
  )
}

export default MyCaregiverProfile