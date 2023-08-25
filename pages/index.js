import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Head from 'next/head'
import useSWR from 'swr'
import Card from '../components/Card'
import Image from 'next/image'
import logo from '../public/parkwhere.png'
import { Rubik } from 'next/font/google'

const fetcher = url => fetch(url).then((res) => res.json())

const rubik = Rubik({
  subsets: ['latin']
})

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

  const showMenu = event => {
    event.currentTarget.classList.toggle(styles.menuOpened)
  }

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
            <Image src={logo} alt='Logo' width={120} priority={true} />
          </div>

          <div className='col-4 text-end'>
            <a href='' className={rubik.className}><button className={styles.btn}>Where I park?</button></a>
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