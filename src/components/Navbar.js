import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import styles from './Navbar.css';
import { IconContext } from 'react-icons';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.min.css";



function Navbars() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Navbar expand="lg">
  <Container>
    <Navbar.Brand className="site-name" href="#home">
    {/* <img alt="" src="src/assets/logo3.png" width="15"
          height="30" className="d-inline-block align-top"/> */}
    Budget Butler</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto" >
        <Nav.Link href="/overview">Overview</Nav.Link>
        <Nav.Link href="/groceries">Grocery</Nav.Link>
        <Nav.Link href="/reports">Reports</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link> 
      </Nav>
      
    </Navbar.Collapse>
  </Container>
</Navbar>

    // <>
    //   <IconContext.Provider value={{ color: '#fff' }}>
    //     <div className='navbar'> 
    //       <Link to='#' className='menu-bars'>
    //         <FaIcons.FaBars onClick={showSidebar}/>
    //         <h3 className='site-name'>BudgetButler</h3>
    //       </Link>
    //     </div>
        
    //     <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
    //       <ul className='nav-menu-items' onClick={showSidebar}>
    //         <li className='navbar-toggle'>
    //           <Link to='#' className='menu-bars'>
    //             <AiIcons.AiOutlineClose />
    //           </Link>
    //         </li>
    //         {SidebarData.map((item, index) => {
    //           return (
    //             <li key={index} className={item.cName}>
    //               <Link to={item.path}>
    //                 {item.icon}
    //                 <span>{item.title}</span>
    //               </Link>
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </nav>
    //   </IconContext.Provider>
    // </>
  );
}

export default Navbars;