import { useState, useRef, useEffect } from 'react'
import { Rubik, Noto_Sans } from 'next/font/google'
import styles from '../styles/Card.module.css'

const rubik = Rubik({
  subsets: ['latin']
})

const notoSan = Noto_Sans({
  subsets: ['latin'],
  weight: ['600']
})

const VehicleType = ({type}) => {
  if (type == 'C') {
    return <p>Lot Type: <span>Cars</span></p>
  }
  else if (type == 'Y') {
    return <p>Lot Type: <span>Motorcycles</span></p>
  }
  else {
    return <p>Lot Type: <span>Heavy Vehicles</span></p>
  }
}

const ChangeLetterCase = ({address}) => {
  var words = address.split(' ')
  var newWord = []

  words.forEach(word => {
    newWord.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  })

  return <h4 className={notoSan.className}>{newWord.join(' ')}</h4>
}

const Card = ({item}) => {
  const [isOpened, setOpened] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpened(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])


  return (
    <div className={`${styles.card} ${rubik.className}`}>
      <p className={styles.lotsAvailable}>{item.avaialbleLots} Lots Available</p>

      {/* <ChangeLetterCase address={item.name} /> */}
      <h4 className={notoSan.className}>{item.name}</h4>

      <div className={styles.cardBody}>
        <div className={styles.carparkDescription}>
          <p>
            Carpark Code: {item.carparkID <= 66 ? "-" : item.carparkID}
          </p>

          <VehicleType type={item.lotType} />
        </div>

        {/* <div className={styles.tagsContainer}>
          {
            (item.AvailableLots != 0) ?
              <span className={`${styles.tags} ${styles.availabilityTag}`}>Available</span> :
              <span className={`${styles.tags} ${styles.availabilityTag} ${styles.unavailable}`}>Unavailable</span>
          }

          <span className={`${styles.tags} ${styles.freeParkingTag}`}>Free Parking</span>
        </div> */}

        <div className={styles.buttonContainer}>
          <div className='row align-items-center'>
            <div className='col-6'>
              <a href={`/carpark?id=${item.carparkID}&location=${item.location.split(' ')[0] + ',' + item.location.split(' ')[1]}`}><button type='button' className={styles.btn}>Details</button></a>
            </div>

            <div className='col-6'>
              <div style={{ position: 'relative' }}>
                <button type='button-outline' className={`${styles.btn} ${styles.btnOutline}`} onClick={() => setOpened(true)}>View on Map</button>

                {
                  isOpened && item.location != 'unknown' &&
                    <div className={styles.mapOptions}  ref={ref}>
                      <a href={'https://www.waze.com/live-map/directions?to=ll.' + item.location.split(' ')[0] + '%2C' + item.location.split(' ')[1]} target='_blank'>Waze</a>
                      <a href={'https://www.google.com/maps/place/' + item.location.split(' ')[0] + 'N+' + item.location.split(' ')[1] + 'E'} target='_blank'>Google Map</a>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card