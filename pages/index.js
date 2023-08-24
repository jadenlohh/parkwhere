import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Head from 'next/head'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
	const { data, error, isLoading } = useSWR('https://api.data.gov.sg/v1/transport/carpark-availability', fetcher)

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
									<h5></h5>

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

				<div className='row gy-4'>
					{
						data.items[0].carpark_data.map((item, index) => {
							return (
								<div className='col-md-4 col-sm-12' key={index}>
									<div className={styles.card}>
										<h5>{item.carpark_number} <span className={styles.distance}>(123m away)</span></h5>

										<div className={styles.cardBody}>
											<p className={styles.location}><i className="fa-sharp fa-solid fa-location-dot"></i> <span>BLK 207/208 JURONG EAST STREET 21</span></p>

											<p className={styles.lotsAvailable}><i className="fa-solid fa-square-parking"></i> <span>{item.carpark_info[0].lots_available} Lots Available</span></p>

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
							)
						})
					}
				</div>
			</div>
		</Layout>
	)
}