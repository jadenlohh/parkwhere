import React from 'react';
import '../../styles/carpark.css';

const Carpark = ({ name, availableLots, carparkID, lotType, agency }) => {
  const carparkLotType = ((type) => {
    if (type === 'C') {
      return <i className='fa-solid fa-car-side carpark-icon'></i>
    }
    else if (type === 'Y') {
      return <i className='fa-solid fa-motorcycle carpark-icon'></i>
    }
    else {
      return <i className='fa-solid fa-truck carpark-icon'></i>
    }
  })

  const carparkAgency = (agency) => {
    if (agency === 'HDB') {
      return <span className='tag hdb-tag me-2'>HDB</span>
    }
    else if (agency === 'LTA') {
      return <span className='tag lta-tag me-2'>LTA</span>
    }
    else {
      return <span className='tag ura-tag me-2'>URA</span>
    }
  }

  const freeParking = () => {
    if (agency === 'HDB') {
      const d = new Date()
      const publicHoliday = ["1/1/2024", "10/2/2024", "11/2/2024", "29/3/2024", "10/4/2024", "1/5/2024", "22/5/2024", "17/6/2024", "9/8/2024", "31/10/2024", "25/12/2024"]

      if (publicHoliday.some(inputDate => {
        return new Date(inputDate.split("/")[2], inputDate.split("/")[1] - 1, inputDate.split("/")[0]).toDateString() === d.toDateString()
      })) {
        return <span className='tag free-parking-tag'>Free Parking</span>;
      }

      if (d.getDay() === 0 && d.getHours() >= 7 && (d.getHours() <= 22 && d.getMinutes() <= 30)) {
        return <span className='tag free-parking-tag'>Free Parking</span>
      }
    }
  }

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

          {freeParking(agency)}
        </div>
      </div>
    </a>
  )
}

export default Carpark