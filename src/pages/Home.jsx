import React from 'react';
import '../styles/home.css';
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

        <div className='text-start container my-3 last-updated-time'>
          <span>Last Updated at {new Date().toLocaleTimeString('en-SG')}</span>
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
            previousPageItemText: 'Previous',
            nextPageItemText: 'Next'
          }} />
        </div>
      </InstantSearch>
    </div>
  )
}

export default Home