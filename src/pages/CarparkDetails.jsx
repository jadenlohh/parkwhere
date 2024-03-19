import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/carpark-details.css';
import HDBCarpark from '../component/carpark/carpark-details/HDBCarpark';
import { useSearchParams } from 'react-router-dom';

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
    <HDBCarpark name={carpark.name} location={carpark.location} />
  )
}

export default CarparkDetails