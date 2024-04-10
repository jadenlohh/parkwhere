import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/carpark-details.css';
import HDB from '../component/carpark/carpark-details/HDB';
import { useSearchParams } from 'react-router-dom';
import OtherCarparks from '../component/carpark/carpark-details/OtherCarpark';

const CarparkDetails = () => {
  const [carpark, setCarpark] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    let ignore = false

    axios.get(process.env.REACT_APP_API_URL + '/carpark/' + searchParams.get('id')).then(response => {
      if (!ignore) {
        setCarpark(response.data)
      }
    })

    return () => { ignore = true }
  }, [])

  return (
    <>
      {
        carpark.carparkID != false ? <HDB name={carpark.name} location={carpark.location} /> : <OtherCarparks name={carpark.name} location={carpark.location} />
      }
    </>
  )
}

export default CarparkDetails