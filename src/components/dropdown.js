import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function MatchDropdown() {
    return(
        <div className='d-flex align-items-center sticky-top justify-content-center bg-dark'>
            
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" className='my-2'>
          Ekstraklasa Seasons
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item href="/season/sr:season:77453">20/21</Dropdown.Item>
          <Dropdown.Item href="/season/sr:season:84320">21/22</Dropdown.Item> 
        </Dropdown.Menu>
      </Dropdown>
    
        </div>
    )
}

export default MatchDropdown;