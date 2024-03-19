import React from 'react';
import '../../styles/carpark.css';

const Carpark = ({ name, availableLots, carparkID, lotType, agency }) => {
  const carparkLotType = ((type) => {
    if (type === 'C') {
      return <i className='fa-solid fa-car carpark-icon'></i>
    }
    else if (type === 'Y') {
      return <i className='fa-solid fa-motorcycle carpark-icon'></i>
    }
    else {
      return <i className='fa-solid fa-truck-front carpark-icon'></i>
    }
  })

  const carparkAgency = ((agency) => {
    if (agency === 'HDB') {
      return <span className='tag hdb-tag me-2'>HDB</span>
    }
    else if (agency === 'LTA') {
      return <span className='tag lta-tag me-2'>LTA</span>
    }
    else {
      return <span className='tag ura-tag me-2'>URA</span>
    }
  })

  return (
    <a href={'/carpark?id=' + carparkID}>
      <div className='carpark-info-card text-start'>
        <div className='d-flex flex-row justify-content-between'>
          <div>
            <p className='lots-available'>{availableLots} Lots Available</p>
          </div>

          <div className='align-self-center text-center carpark-icon-container'>
            {carparkLotType(lotType)}
          </div>
        </div>

        <h4 className='carpark-name'>{name}</h4>

        {carparkID <= 66 ? <p className='carpark-code'>Carpark Code: -</p> : <p className='carpark-code'>Carpark Code: {carparkID}</p>}

        <div className='d-flex flex-row tags-container'>
          {carparkAgency(agency)}
          {/* <span className='tag free-parking-tag'>Free Parking</span> */}
        </div>
      </div>
    </a>
  )
}

export default Carpark