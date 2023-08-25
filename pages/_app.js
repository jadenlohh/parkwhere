import '../styles/global.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous" />

				<script src="https://kit.fontawesome.com/aa241108d7.js" crossorigin="anonymous"></script>
			</Head>

			<Component {...pageProps} />
		</>
	)
}