import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import axios from 'axios';
import Carpark from '../component/carpark/Carpark';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Pagination } from 'react-instantsearch';

const searchClient = algoliasearch('TDYA19370W', '00bed413632a8bd960c5b22edb2221bf');

const Hit = ({ hit }) => {
  return (
    <article className=''>
      <Carpark name={hit.name} availableLots={hit.availableLots} carparkID={hit.carparkID} lotType={hit.lotType} agency={hit.agency} />
    </article>
  )
}

const Home = () => {
  const [toggle, setToggle] = useState(false)
  const [carparks, setCarparks] = useState([])
  const [time, setTime] = useState('')

  useEffect(() => {
    let ignore = false

    axios.get(process.env.REACT_APP_API_URL).then(response => {
      if (!ignore) {
        setCarparks(response.data)
        setTime(new Date().toLocaleTimeString('en-SG'))
      }
    })

    return () => { ignore = true }
  }, [])

  return (
    <div className='mt-2'>
      <InstantSearch searchClient={searchClient} indexName="carparks">
        <div className='container search-container'>
          <i className="fa-solid fa-magnifying-glass search-icon"></i>

          <SearchBox placeholder='Search for carparks' classNames={{
            root: 'container',
            form: 'row justify-content-center',
            input: 'form-control search-bar',
            submit: 'd-none',
            reset: 'd-none'
          }} />
        </div>

        <div className='container my-3 masterhead'>
          <div className='d-flex masterhead-title'>
            <div className='pe-1'>
              <p className='mb-0'>Last Updated at {time}</p>
            </div>

            {
              toggle ?
                <div className='px-0' onClick={() => { setToggle(!toggle) }} style={{ display: 'flex' }}><i className="fa-solid fa-chevron-up"></i></div> :
                <div className='px-0' onClick={() => { setToggle(!toggle) }} style={{ display: 'flex' }}><i className="fa-solid fa-chevron-up" style={{ rotate: '180deg' }}></i></div>
            }
          </div>

          {toggle && (
            <div className='my-3 masterhead-content'>
              <p>
                All parking details are obtained from&nbsp;
                <a href='https://datamall.lta.gov.sg/content/datamall/en.html' style={{ textDecoration: 'none' }}>LTA <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.62rem' }}></i></a> and&nbsp;
                <a href='https://www.ura.gov.sg/maps/api' style={{ textDecoration: 'none' }}>URA <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.62rem' }}></i></a> APIs and may not contain all carparks in Singapore.
              </p>
            </div>
          )}
        </div>

        <div className='container'>
          <Hits hitComponent={Hit} classNames={{
            list: 'row mt-2 ps-0 carpark-list my-0',
            item: 'col-md-4 col-sm-12 mb-4'
          }} />
        </div>

        <div className='container mt-4 mb-5'>
          <Pagination showFirst={false} showLast={false} classNames={{
            list: 'row justify-content-center pagination mb-0',
            item: 'col-1 pagination-item',
            link: 'pagination-link',
            selectedItem: 'pagination-item-selected'
          }}
            translations={{
              previousPageItemText: 'Prev',
              nextPageItemText: 'Next'
            }} />
        </div>
      </InstantSearch>
    </div>
  )
}

export default Home