import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Head from 'next/head'
import useSWR from 'swr'
import Card from '../components/Card'
import Script from 'next/script'
import Image from 'next/image'
import profilePic from '../public/parkwhere.png'

const fetcher = url => fetch(url).then((res) => res.json())

const search = () => {
  var input, filter, ul, li, a, i, txtValue
  input = document.getElementById('searchBar')
  filter = input.value.toUpperCase()
  ul = document.getElementById('carparkList')
  li = ul.getElementsByTagName('li')

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('h4')[0]
    txtValue = a.textContent || a.innerText

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = ''
    } else {
      li[i].style.display = 'none'
    }
  }
}

export default function Home() {
  const { data, error, isLoading } = useSWR('https://carpark-locator-api.vercel.app/', fetcher)

  if (error) return "An error has occurred."

  if (isLoading) return (
    <div className='container'>
      <div className={styles.searchBarContainer}>
        <form>
          <input type='text' className={styles.searchBar} placeholder='Search by address' />
        </form>
      </div>

      <div className='row gy-4'>
        {
          [...Array(20).keys()].map(i => {
            return (
              <div className='col-md-4 col-sm-12' key={i}>
                <div className={`${styles.card} ${styles.skeleton}`}>
                  <h4></h4>

                  <div className={styles.cardBody}>
                    <p></p>
                    <p></p>

                    <div className={styles.tagsContainer}>
                      <span className={styles.tags}></span>
                      <span className={styles.tags}></span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )

  return (
    <Layout>
      <Head>
        <title>Carpark Locator</title> 
      </Head>

      <div className='container'>
        <nav className='row justify-content-between align-items-center' style={{paddingTop: '1em'}}>
          <div className='col-4'>
            <Image src={profilePic} alt='Logo' width={120} />
          </div>

          <div className='col-2 text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="14" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="7" y2="18"/>
            </svg>
          </div>
        </nav>

        <div className={styles.searchBarContainer}>
          <form>
            <input type='text' className={styles.searchBar} id='searchBar' placeholder='Search by name or address' onKeyUp={search} />
          </form>
        </div>

        <ul className='row gy-3' id='carparkList' style={{ listStyle: 'none', padding: 0 }}>
          {
            data.value.map((item, index) => {
              return (
                <li className='col-md-4 col-sm-12' key={index}><Card item={item} /></li>
              )
            })
          }
        </ul>
      </div>
    </Layout>
  )
}