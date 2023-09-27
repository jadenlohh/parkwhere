import Navbar from "./Navbar"
import styles from '../styles/Home.module.css'

const IndexPageLoading = () => {
  return (
    <div className='container'>
      <Navbar />

      <div className={styles.searchBarContainer}>
        <form>
          <input type='text' className={styles.searchBar} placeholder='Search by name or address' />
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
}

export default IndexPageLoading