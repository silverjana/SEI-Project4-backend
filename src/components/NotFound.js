import { Button, Container } from '@mui/material'
import { Link } from "react-router-dom"

const NotFound = () => {  
  return (
    <Container className='authform'>
      <h2> <br />404 - Page NotFound </h2>
  
      <Link className='navigatebtn' to="/">Back to Home</Link>
    </Container>
  )
}
export default NotFound