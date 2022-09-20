import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    
      <div className='landing'>
        <h4>welcome to </h4>
        <h1>Click<span>+</span>Care</h1>
        <p>Create a profile, add a Task and look for a Healtcare professional to take care of you, or join our Team!</p>
        
        <Link className='navigatebtn' to="/register">Register</Link> <br />
        
        <Link className='navigatebtn' to="/caregivers">Meet our team</Link>
      </div>
  
  )
}
export default Landing