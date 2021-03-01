import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class NavBar extends React.Component {
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/login"
    }
    render(){
        return(
            <nav class="navbar navbar-expand-lg <strong> navbar-light bg-light </strong>"> 
            <div class="container">
            <Navbar.Brand> <Link to='/'>Home</Link></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link> <Link to='/pegawai'> Pegawai </Link> </Nav.Link>
                    <Nav.Link> <Link to='/siswa'> Daftar Siswa </Link> </Nav.Link>
                    <Nav.Link> <Link to='/pelanggaran'> Pelanggaran </Link></Nav.Link>
                    <Nav.Link onClick={() => this.Logout()}>Logout</Nav.Link>
                </Nav>
                </div>
                </nav>
                
            
        )
    }
}
export default NavBar;
