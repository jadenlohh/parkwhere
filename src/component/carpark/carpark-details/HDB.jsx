import React from 'react';

const HDB = ({ name, location }) => {
  return (
    <div className='container mt-4 carpark-details-container'>
      <h2>{name}</h2>

      <div className='carpark-details mt-5'>
        <div>
          <h5>Weekdays</h5>
          <p>$0.60 per half-hour</p>
        </div>

        <div className='mt-4'>
          <h5>Saturday</h5>
          <p>$0.60 per half-hour</p>
        </div>

        <div className='mt-4'>
          <h5>Sunday/Public Holiday</h5>
          <p>Free parking from 7.00am to 10.30pm<br />$0.60 per half-hour from 10.30pm to 7am</p>
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

export default HDB