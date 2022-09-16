// import Radio from '@mui/material/Radio'
// import RadioGroup from '@mui/material/RadioGroup'
// import FormControlLabel from '@mui/material/FormControlLabel'
import { useState, useEffect } from 'react'
import { TextField, Container, Button } from '@mui/material'
import { API_URL } from '../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Link} from '@mui/material'

import { setToken } from '../helpers/auth'

const Login = () => {
  //when coming back to page, scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])


  const navigate = useNavigate()

  //get / set data values
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const [login, setlogin] = useState(false)

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
      const res = await axios.post(`http://127.0.0.1:8000/auth/login/`, userData)
      //console.log(res.data)
      //token is in the response
      const { token } = res.data
      //set in local storage
      setToken(token)
      //put token in header for all requests, with bearer
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      //go to 
      navigate("/userprofile")
      setlogin(true)
    } catch (error) {
      console.log('ERR', error)
      setError(error.response.data.detail ? error.response.data.detail : error.message ) //!doesn't work?
      //setError(error.message )
    }

  }

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <section className='authPage'>
    <Container className="authform">
      <h2>Login</h2>
      <form className="form" onSubmit={onSubmit}>
        {error && <div className='error-mex'>{error}</div>}
        <TextField required error={error ? true : false} className="form-input" variant="filled" name='email' label="Email" value={userData.email} onChange={handleChange} />
        <TextField required error={error ? true : false} className="form-input" variant="filled" type="password" name='password' label="Password" value={userData.password} onChange={handleChange} />
        <button type='submit' className='submitbtn' >Login</button>
        {login && 
          <>
            <button className='btn oksubmit' onClick={handleClick}>Done! Click here to go back</button>
            <Link className="btn oksubmit" href="/" >Or click here to go to Home</Link>
          </>
        }
      </form>
    </Container>
    </section>
  )
}

export default Login