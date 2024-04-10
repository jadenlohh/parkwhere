import React from 'react';

const OtherCarparks = ({ name, location }) => {
  return (
    <div className='container mt-4 carpark-details-container'>
      <h2>{name}</h2>

      <div className='carpark-details mt-5'>
        <div>
          <p>No Parking Rates Available</p>
        </div>

        <iframe
          className='my-5'
          style={{ border: 'none', width: '100%', 'height': '20em', borderRadius: '.6em' }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={"https://www.google.com/maps/embed/v1/place?maptype=satellite&key=" + process.env.REACT_APP_GOOGLE_MAP_KEY + "&q=" + location}>
        </iframe>
      </div>
    </div>
  )
}

export default OtherCarparks