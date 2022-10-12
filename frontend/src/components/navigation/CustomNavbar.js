import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import {BiLogInCircle, BiLogOutCircle} from 'react-icons/bi'
const CustomNavBar = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">MERN E-COMMERCE</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href={baseUrl}>Shop</Nav.Link>
                    <Nav.Link href={`${baseUrl}/cart`}>Cart</Nav.Link>
                    <Nav.Link href={`${baseUrl}/orders`}>Orders</Nav.Link>
                    <Nav.Link href={`${baseUrl}/profile`}>Profile</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    {
                        isAuthenticated?
                        <>
                        <Navbar.Text>Signed in as: <a href="#login">{user.nickname}</a></Navbar.Text>
                        <Button className='navbar-btn' onClick={() =>
                            logout({
                                returnTo: window.location.origin,
                            })
                        } size='sm' variant='danger'><BiLogOutCircle/></Button>
                        </>
                        :
                        <Button className='navbar-btn' onClick={() =>
                            loginWithRedirect({
                                screen_hint: 'signup',
                            })
                        } size='sm' variant='light'>
                            <BiLogInCircle/>
                        </Button>
                    }
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavBar;