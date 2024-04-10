import React, { useEffect, useState } from 'react';
import '../styles/carpark.css';
import axios from 'axios';
import Carpark from '../component/carpark/Carpark';

const Home = () => {
  const [carparks, setCarparks] = useState([])

  useEffect(() => {
    let ignore = false

    axios.get('http://localhost:8000').then(response => {
      if (!ignore) {
        setCarparks(response.data)
      }
    })

    return () => { ignore = true }
  }, [])

  return (
    <div>
      <div className='text-start container last-updated-time'>
        <span>Last Updated at {new Date().toLocaleTimeString('en-SG')}</span>
      </div>

      <div className='container'>
        <ul className='row mt-2 ps-0 carpark-list'>
          {
            carparks.map((item, index) => {
              return (
                <li key={index} className='col-md-4 col-sm-12 mb-4'>
                  <Carpark name={item.name} availableLots={item.availableLots} carparkID={item.carparkID} lotType={item.lotType} agency={item.agency} />
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Home