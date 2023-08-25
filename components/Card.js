import { useState } from 'react'
import styles from '../styles/Home.module.css'

const ConditionalWrapper = ({vehicleType}) => {
  if (vehicleType == 'C') {
    return <p className={styles.carparkType}>Lot Type: <span>Cars</span></p>
  }
  else if (vehicleType == 'Y') {
    return <p className={styles.carparkType}>Lot Type: <span>Motorcycles</span></p>
  }
  else {
    return <p className={styles.carparkType}>Lot Type: <span>Heavy Vehicles</span></p>
  }
}

const Card = ({item, index}) => {
  const [isOpened, setOpened] = useState(false)

  return (
    <div className='col-md-4 col-sm-12'>
      <div className={styles.card}>
        <p className={styles.lotsAvailable}>{item.AvailableLots} Lots Available</p>

        <h4 className={styles.location}>{item.Development}</h4>

        <div className={styles.cardBody}>
          <ConditionalWrapper vehicleType={item.LotType}></ConditionalWrapper>

          <div className={styles.tagsContainer}>
            {
              (item.AvailableLots != 0) ?
                <span className={`${styles.tags} ${styles.availabilityTag}`}>Available</span> :
                <span className={`${styles.tags} ${styles.availabilityTag} ${styles.unavailable}`}>Unavailable</span>
            }
            <span className={`${styles.tags} ${styles.freeParkingTag}`}>Free Parking</span>
          </div>

          <div className={styles.buttonContainer}>
            <div className='row align-items-center'>
              <div className='col-5'>
                <button type='button' className={styles.btn}>Details</button>
              </div>

              <div className='col-7'>
                <div style={{ position: 'relative' }}>
                  <button type='button-outline' className={`${styles.btn} ${styles.btnOutline}`} onClick={() => setOpened(!isOpened)}>View on Map</button>

                  {
                    isOpened &&
                      <div className={styles.mapOptions}>
                        <a href={'https://www.waze.com/live-map/directions?to=ll.' + item.Location.split(' ')[0] + '%2C' + item.Location.split(' ')[1]} target='_blank'>Waze</a>
                        <a href={'https://www.google.com/maps/place/' + item.Location.split(' ')[0] + 'N+' + item.Location.split(' ')[1] + 'E'} target='_blank'>Google Map</a>
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card