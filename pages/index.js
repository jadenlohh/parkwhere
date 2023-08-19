import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Head from 'next/head'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>carpark locator</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet" />

        <script src="https://kit.fontawesome.com/aa241108d7.js" crossorigin="anonymous"></script>
      </Head>

      <div className='container'>
        <div className={styles.searchBarContainer}>
          <form>
            <input type='text' className={styles.searchBar} placeholder='Search by address' />
          </form>
        </div>

        <div className='row'>
          <div className='col-md-4 col-sm-12'>
            <div className={styles.card}>
              <h5>BM29 <span className={styles.distance}>(123m away)</span></h5>

              <div className={styles.cardBody}>
                <p className={styles.location}><i className="fa-sharp fa-solid fa-location-dot"></i> <span>BLK 207/208 JURONG EAST STREET 21</span></p>

                <p className={styles.lotsAvailable}><i className="fa-solid fa-square-parking"></i> <span>20 Lots Available</span></p>

                <div className={styles.tagsContainer}>
                  <span className={`${styles.tags} ${styles.availabilityTag}`}>Available</span>
                  <span className={`${styles.tags} ${styles.freeParkingTag}`}>Free Parking</span>
                </div>

                <div className={styles.buttonContainer}>
                  <div className='row align-items-center'>
                    <div className='col-6'>
                      <button type='button' className={styles.btn}>Details</button>
                    </div>

                    <div className='col-6'>
                      <button type='button-outline' className={`${styles.btn} ${styles.btnOutline}`}>View on Map</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}