import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import styles from "./Navbar.css";
import { IconContext } from "react-icons";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbars() {
  // const [sidebar, setSidebar] = useState(false);
  // const showSidebar = () => setSidebar(!sidebar);

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="site-name" href="/">
          Budget Butler
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="me-auto" id="subList">
            <Nav.Link href="/overview">Overview</Nav.Link>
            <Nav.Link href="/groceries">Grocery</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
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
