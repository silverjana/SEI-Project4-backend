import { Link } from 'react-router-dom'

const Landing = () => {  
  return (
    <>
      <h1>Landing - welcome to website</h1>
      <Link to='/register'>Register!</Link> <br />
      <Link to='/caregivers'>Meet our team</Link>
    </>
  )
}
export default Landing