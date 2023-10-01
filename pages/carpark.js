'use client'

import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Layout from '@/components/layout'
import styles from '../styles/Carpark.module.css'
import { Noto_Sans, Rubik } from 'next/font/google'

const fetcher = url => fetch(url).then((res) => res.json())

const notoSan = Noto_Sans({
  subsets: ['latin'],
  weight: ['600']
})

const rubik = Rubik({
  subsets: ['latin']
})

const ChangeLetterCase = ({address}) => {
  var words = address.split(' ')
  var newWord = []

  words.forEach(word => {
    newWord.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  })

  return <h3 className={`${notoSan.className} `}>{newWord.join(' ')}</h3>
}

const Carpark = () => {
  const { data, error, isLoading } = useSWR('https://parkwhere-api.vercel.app/carpark-info', fetcher)

  const searchParams = useSearchParams()
  const carparkID = searchParams.get('id')
  const location = searchParams.get('location')

  const carparkInCBD = ['ACB', 'BBB', 'BRB1', 'CY', 'DUXM', 'HLM', 'KAB', 'KAM', 'KAS', 'PRM', 'SLS', 'SR1', 'SR2', 'TPM', 'UCS', 'WCB']

  if (isLoading) return "Loading"

  if (error) return "Error"

  return (
    <Layout>
      <div className={`container ${styles.container}`}>
        <Navbar />

        <div className={`${styles.carparkDetails} ${rubik.className}`}>
          {
            data.map(carpark => {
              if (carpark['car_park_no'] == carparkID) {
                return (
                  <>
                    <div className={styles.address}>
                      <ChangeLetterCase address={carpark['address']} />
                      <a href='https://www.google.com/maps/search/Singapore+120349/'>Blk 349, Clementi Ave 2, S(120349)</a>
                    </div>

                    <div className={styles.carparkRates}>
                      {
                        carparkInCBD.includes(carparkID) ? 
                          <>
                            <div className={styles.ratesContainer}>
                              <h6>Monday to Friday:</h6>
                              <p>$1.20 per half-hour from 7AM to 5PM<br />$0.60 per half hour after 5PM</p>
                            </div>

                            <div className={styles.ratesContainer}>
                              <h6>Saturday:</h6>
                              <p>Same as weekdays</p>
                            </div>

                            <div className={styles.ratesContainer}>
                              <h6>Sunday/Public Holiday:</h6>
                              <p>$0.60 per half hour</p>
                            </div>
                          </> :
                          <>
                          <div className={styles.ratesContainer}>
                            <h6>Monday to Friday:</h6>
                            <p>$0.60 per half-hour</p>
                          </div>

                          <div className={styles.ratesContainer}>
                            <h6>Saturday:</h6>
                            <p>Same as weekdays</p>
                          </div>

                          <div className={styles.ratesContainer}>
                            <h6>Sunday/Public Holiday:</h6>

                            {
                              carpark['free_parking'] != 'NO' ? <p>Free parking from {carpark['free_parking'].split(' FR ')[1].replace('-', ' to ')}</p> : <p>Same as weekdays</p>
                            }
                          </div>
                        </>
                      }
                    </div>
                  </>
                )
              }
            })
          }
        </div>

        <iframe
          className={styles.map}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCaJjrn-C_RlBiP7yrTtSEZPFzyBwxCt_s&q=${location}`}>
        </iframe>
      </div>
    </Layout>
  )
}

export default Carpark