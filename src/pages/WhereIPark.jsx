import React, { useState } from 'react';
import '../styles/where-i-park.css';

const WhereIPark = () => {
  const [parkingDetails, setParkingDetails] = useState(false)

  const saveParkingDetails = (event) => {
    event.preventDefault()

    localStorage.setItem('carpark-level', document.getElementById('carpark-level').value)
    localStorage.setItem('lot-number', document.getElementById('lot-number').value)

    setParkingDetails(true)
  }

  const deleteParkingDetails = () => {
    localStorage.removeItem('carpark-level')
    localStorage.removeItem('lot-number')

    setParkingDetails(false)
  }

  return (
    <div className='container mt-2 where-i-park'>
      {
        parkingDetails ?
          <div className='text-center'>
            <i className="fa-solid fa-car-side" style={{ fontSize: '2.5rem' }}></i>

            <p className='mt-3 mb-2'>You parked your car at</p>
            <h5>level <span>{localStorage.getItem('carpark-level')}</span> lot <span>{localStorage.getItem('lot-number')}</span></h5>

            {/* <p className='mt-4' onClick={deleteParkingDetails} style={{fontSize: '0.8rem'}}>Clear parking details</p> */}
            <button className='btn btn-primary shadow-none mt-2' style={{borderRadius: '20rem', padding: '0.5rem 1rem', fontSize: '0.8rem'}} onClick={deleteParkingDetails}>Done</button>
          </div> :
          <div>
            <div>
              <h5 className='mt-3'>Save your parking lot number</h5>
              <p className='mb-0'>Enter your parking lot number so you will never get lost finding your vehicle.</p>
            </div>

            <div className='row mt-5'>
              <form id='where-i-park-form' onSubmit={saveParkingDetails}>
                <div className='mb-3'>
                  <label htmlFor='carpark-level' className='form-label'>Carpark Level/Deck</label>
                  <input type='number' className='form-control shadow-none' id='carpark-level' name='carpark-level' placeholder='Eg. 4' max='9' required />
                </div>

                <div className='mb-5'>
                  <label htmlFor='lot-number' className='form-label'>Lot Number</label>
                  <input type='number' className='form-control shadow-none' id='lot-number' name='lot-number' placeholder='Eg. 302' required />
                </div>

                <div className='d-flex align-items-center justify-content-end'>
                  <button type='submit' className='btn btn-primary'>Confirm</button>
                </div>
              </form>
            </div>
          </div>
      }
    </div>
  )
}

export default WhereIPark