// import Radio from '@mui/material/Radio'
// import RadioGroup from '@mui/material/RadioGroup'
// import FormControlLabel from '@mui/material/FormControlLabel'
import { useState } from 'react'
import { TextField, Container, Button } from '@mui/material'
import { API_URL } from '../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {  

  // //select which user to register as
  // const [type, setType] = useState(parseInt('7'))

  // const changeType = event => {
  //   setType(parseInt(event.target.value))
  //   console.log(type)
  // }

  const navigate = useNavigate()

  //get / set data values
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
    console.log(event.target)
    setError('')
  }

  const [error, setError] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    console.log('submitted', userData)
    try {
      //API req POST to register
      await axios.post(`${API_URL}/auth/login/`, userData) 
      //go to 
      //navigate("/ profile page or home")
      
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }

  }

  return (
    <Container className="authform">
      <h1>Login</h1>
      <form className="form" onSubmit={onSubmit}>
      {/*  <RadioGroup row className="login-radio-buttons-group" onClick={changeType} value={type}>
        <FormControlLabel value="7" name="type" control={<Radio color="secondary" />} label="User" />
        <FormControlLabel value="8" name="type" control={<Radio color="secondary" />} label="Healthcare Professional" />
      </RadioGroup> */ }
      {error && <div className='error-mex'>{error}</div>}
      <TextField required error={error ? true : false} className="form-input" variant="filled" name='email' label="Email" value={userData.email} onChange={handleChange} />
      <TextField required error={error ? true : false} className="form-input" variant="filled" type="password" name='password' label="Password" value={userData.password} onChange={handleChange} />
      <Button variant="outlined" type='submit' className='submitbtn' >Login</Button>
      </form>
    </Container>
  )
}

export default Login