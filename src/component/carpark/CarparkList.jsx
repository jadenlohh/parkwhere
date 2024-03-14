import React, { useEffect, useState } from 'react';
import '../../styles/carpark.css';
import axios from 'axios';
import Carpark from './Carpark';

const CarparkList = () => {
  const [carparks, setCarparks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function startFetching() {
      await axios.get('https://parkwhere-api.vercel.app').then(response => {
        if (!ignore) {
          setCarparks(response.data)
        }
      })
    }

    let ignore = false
    // setIsLoading(true)

    startFetching()
    // setIsLoading(false)

    return () => { 
      ignore = true 
    }
  }, [])

  return (
    <ul className='row ps-0 mt-4 carpark-list'>
      {
        isLoading ? 
          <p>Loading...</p> : 
          
          carparks.map((item, index) => {
            return (
              <li key={index} className='col-md-4 col-sm-12 mb-4'>
                <Carpark name={item.name} availableLots={item.availableLots} code={item.carparkID} lotType={item.lotType} agency={item.agency} />
              </li>
            )
          })
      }
    </ul>
  )
}

export default CarparkList