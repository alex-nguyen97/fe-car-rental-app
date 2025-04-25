import { React } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import PersonalAvatar from './personal-avatar';
import SearchBar from './search-bar';
import Logo from '../assets/company-logo.avif';

const MenuBar = () => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      sticky="top"
      className="shadow"
      style={{ paddingTop: '12px' }}
    >
      <Container
        fluid
        style={{ maxWidth: '100%', paddingLeft: '20px', paddingRight: '20px' }}
      >
        <div className="d-flex w-100 justify-content-between align-items-center">
          <Image
            src={Logo}
            style={{ width: '50px', height: '50px', marginLeft: '10px' }}
            alt="Logo"
          />
          <Navbar.Brand
            href="/"
            style={{ fontSize: '20px', marginLeft: '10px' }}
          >
            Car rental
          </Navbar.Brand>
          <SearchBar />
          <div className="d-flex align-items-center">
            <Nav className="d-flex">
              <Nav.Link href="/" active>
                Shop
              </Nav.Link>
              <Nav.Link href="/">Login</Nav.Link>
            </Nav>
            <PersonalAvatar />
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default MenuBar;
