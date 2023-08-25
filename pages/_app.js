import Script from 'next/script'
import '../styles/global.css'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'

export default function App({ Component, pageProps }) {
	return (
		<>
      <Script src="https://kit.fontawesome.com/aa241108d7.js" crossorigin="anonymous" />

			<Component {...pageProps} />
		</>
	)
}