import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { NavDropdown } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { Avatar } from "@mui/material"

const Header = () => {  
  


  return (
    <>
    <Navbar id="navbar-container">
      
        <Navbar.Brand as={Link} to='/' className="brand">Home</Navbar.Brand>
        <Nav.Link as={Link} to='/userprofile'>Userprofile</Nav.Link>
        <Nav.Link as={Link} to='/prices'>Prices</Nav.Link>
        <Navbar.Collapse id='basic-navbar' className='justify-content-end'>
          <Nav>
            <NavDropdown title={<Avatar src="./images/blank-profile-picture.webp" />} className="nav-dropdown">
              <NavDropdown.Item as={Link} to='/login'>Login</NavDropdown.Item> <br />
              <NavDropdown.Item as={Link} to='/register'>Register</NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to='/userprofile'>Profile Page</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
    </>
  )
}
export default Header