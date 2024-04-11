import React, { useEffect, useState } from 'react';
import '../styles/carpark.css';
import axios from 'axios';
import Carpark from '../component/carpark/Carpark';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Pagination } from 'react-instantsearch';

const searchClient = algoliasearch('TDYA19370W', '00bed413632a8bd960c5b22edb2221bf');

function Hit({ hit }) {
  return (
    <article className=''>
      <Carpark name={hit.name} availableLots={hit.availableLots} carparkID={hit.carparkID} lotType={hit.lotType} agency={hit.agency} />
    </article>
  )
}

const Home = () => {
  return (
    <div className=''>
      <InstantSearch searchClient={searchClient} indexName="carparks">
        <div className='container'>
          <SearchBox placeholder='Search for carparks' classNames={{
            root: 'container',
            form: 'row',
            input: 'col-12 search-bar',
            submit: 'd-none',
            reset: 'd-none'
          }} />
        </div>

        <div className='text-start container my-3 last-updated-time'>
          <span>Last Updated at {new Date().toLocaleTimeString('en-SG')}</span>
        </div>

        <div className='container'>
          <Hits hitComponent={Hit} classNames={{
            list: 'row mt-2 ps-0 carpark-list',
            item: 'col-md-4 col-sm-12 mb-4'
          }} />
        </div>

        <Pagination />
      </InstantSearch>
    </div>
  )
}

export default Home