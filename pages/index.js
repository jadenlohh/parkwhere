import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Head from 'next/head'
import useSWR from 'swr'

const fetcher = url => fetch(url).then((res) => res.json())

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

export default function Home() {
	const { data, error, isLoading } = useSWR('http://localhost:8000', fetcher)

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

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link href="https://fonts.googleapis.com/css2?family=Rubik&family=Noto+Sans:wght@600&display=swap" rel="stylesheet" />

				<script src="https://kit.fontawesome.com/aa241108d7.js" crossOrigin="anonymous"></script>
			</Head>

			<div className='container'>
				<div className={styles.searchBarContainer}>
					<form>
						<input type='text' className={styles.searchBar} placeholder='Search by address' />
					</form>
				</div>

				<div className='row gy-4'>
					{
						data.value.map((item, index) => {
							return (
								<div className='col-md-4 col-sm-12' key={index}>
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
													<div className='col-6'>
														<button type='button' className={styles.btn}>Details</button>
													</div>

													<div className='col-6'>
                            <a href={'https://www.google.com/maps/place/' + item.Location.split(' ')[0] + 'N+' + item.Location.split(' ')[1] + 'E'} target='_blank'>
                              <button type='button-outline' className={`${styles.btn} ${styles.btnOutline}`}>View on Map</button>
                            </a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		</Layout>
	)
}