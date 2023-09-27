import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Head from 'next/head'
import useSWR from 'swr'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import IndexPageLoading from '@/components/IndexPageLoading'

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
    } 
    else {
      li[i].style.display = 'none'
    }
  }
}

export default function Home() {
  const { data, error, isLoading } = useSWR('https://carpark-locator-api.vercel.app/', fetcher)

  if (error) return "An error has occurred."

  if (isLoading) return <IndexPageLoading />

  return (
    <Layout>
      <Head>
        <title>Carpark Locator</title> 
      </Head>

      <div className='container'>
        <Navbar />

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