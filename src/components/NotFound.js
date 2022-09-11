import { Button, Container } from '@mui/material'

const NotFound = () => {  
  return (
    <Container>
      <h1> 404 - Page NotFound</h1>
      <Button variant="outlined" type='submit' className='navigatebtn' href="/">Back to Home</Button>
      
    </Container>
  )
}
export default NotFound