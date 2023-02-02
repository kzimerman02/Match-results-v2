import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'

function MatchDropdown() {
    return(
      <div id='navbar-div' className='d-flex align-items-center sticky-top justify-content-center '>
        <Navbar variant="dark">
          <Container >
            <Navbar.Brand href="/"  id='home-redirect'>ExtraSeasons</Navbar.Brand>
              <Nav>

                <Dropdown>

                  <Dropdown.Toggle variant="primary" id="dropdown-basic" className='my-2'>
                      Ekstraklasa Seasons
                  </Dropdown.Toggle>
                  
                  <Dropdown.Menu>
                    <Dropdown.Item href="/season/sr:season:77453">20/21</Dropdown.Item>
                    <Dropdown.Item href="/season/sr:season:84320">21/22</Dropdown.Item> 
                  </Dropdown.Menu>

                </Dropdown>
              </Nav>
          </Container>
        </Navbar>
      </div>
    )
}

export default MatchDropdown;