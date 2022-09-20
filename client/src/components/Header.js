import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from "@mui/material"
import { userIsAuthenticated } from '../helpers/auth'

import profileAvatar from '../images/Blank-Avatar.png'

const Header = () => {  
  
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('Project4Token')
    console.log('LOGGED OUT')
    navigate('/login')
  }

  return (
    <>
    <Navbar id="navbar-container">
      
        <Navbar.Brand as={Link} to='/' className="brand">Home</Navbar.Brand>
        <Nav.Link as={Link} to='/userprofile'>Userprofile</Nav.Link>
        <Nav.Link as={Link} to='/prices'>Prices</Nav.Link>
        <Navbar.Collapse id='basic-navbar' className='justify-content-end'>
          <Nav>
            <NavDropdown title={<Avatar src={profileAvatar} />} className="nav-dropdown">
              {userIsAuthenticated()
              ?
              <NavDropdown.Item onClick={handleLogout}>Logout </NavDropdown.Item>
              :
              <>
              <NavDropdown.Item as={Link} to='/login'>Login</NavDropdown.Item> <br />
              <NavDropdown.Item as={Link} to='/register'>Register</NavDropdown.Item>
              </>
              }
            
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        
      
    </Navbar>
    </>
  )
}
export default Header