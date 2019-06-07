import React from 'react';
import './index.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navigation = (props) => {
    const {
        user,
    } = props;

    const adminControls = user && user.username === 'admin'
        ?   (
                <NavDropdown title={user.username} id="dropdown-menu-align-right" variant="dark">
                    <NavDropdown.Item onClick={ console.log() }>Delete all Answers</NavDropdown.Item>
                    <NavDropdown.Item onClick={ console.log() }>Delete all Users</NavDropdown.Item>
                </NavDropdown>
            )
        : null;

    return (
        <Navbar collapseOnSelect expand={true} sticky="top" bg="dark" variant="dark">
            <Navbar.Brand onClick="">Charades</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {adminControls}
                    <Nav.Link onClick="">rules</Nav.Link>
                    <Nav.Link onClick="">history</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
