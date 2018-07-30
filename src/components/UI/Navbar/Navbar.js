import React from 'react';
import { Link } from 'react-router-dom';
import { SIGN_UP, LOGIN, LOGOUT, ROOT } from '../../../constants/routes';

import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const NavbarContainer = (props) => {
  const links = {
    authenticated: [
      { link: { LOGOUT }, label: "Logout" }
    ],
    unAuthenticated: [
      { link: SIGN_UP, label: "Signup" },
      { link: LOGIN, label: "Login" },
    ]
  };

  const currentState = props.isAuthenticated ? "authenticated" : "unAuthenticated";

  let collapse = (
    <Collapse isOpen={props.isOpen} navbar>
      <Nav className="ml-auto" navbar>
        {
          links[currentState].map(item => (
            <NavItem key={item.link}>
              <NavLink tag={Link} to={item.link} active={item.link === props.activeLink}>
                {item.label}
              </NavLink>
            </NavItem>
          ))
        }
      </Nav>
    </Collapse>
  );

  if (props.isAuthenticated) {
    collapse = (
      <Collapse isOpen={props.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to={LOGOUT}>Logout</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    );
  }

  return (
    <div>
      <Navbar fixed={`top`} dark color="dark" expand="md">
        <NavbarBrand tag={Link} to={ROOT}>{props.displayName}</NavbarBrand>
        <NavbarToggler onClick={props.toggle} />
        {collapse}
      </Navbar>
    </div>
  );
}

export default NavbarContainer;