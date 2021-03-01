import Head from 'next/head';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import '../styles/replacer.css';
import '../styles/custom.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Findr: the simplest way to identify any Squarespace template</title>

				{/* meta tags */}
				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
				<meta httpEquiv='content-type' content='text/html;charset=UTF-8' />
				<meta
					name='description'
					content="Find out what template your favorite Squarespace website is using with a simple click! Copy and paste the URL and you're done. Try it out today!"
				/>
				<meta name='author' content='Hustle Like A Boss Design' />

				{/* facebook meta tags */}
				<meta property='og:url' content='http://findr.hustlelikeaboss.design/' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Squrespace Template Finder: easy as a click' />
				<meta
					property='og:description'
					content="Find out what template your favorite Squarespace website is using with a simple click! Copy and paste the URL and you're done. No more fumbling around!"
				/>
				<meta property='og:image' content='https://preview.ibb.co/m9otLF/Findr_screenshot.png' />

				{/* stylesheets */}
				<link
					href='https://fonts.googleapis.com/css?family=Montserrat:200,200i,300,300i,400,400i,500,500i,600,600i'
					rel='stylesheet'
				/>
				<link
					href='https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css'
					rel='stylesheet'
				/>
				<link
					rel='stylesheet'
					href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
					integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
					crossOrigin='anonymous'
				/>
				<link
					rel='stylesheet'
					href='https://use.fontawesome.com/releases/v5.2.0/css/all.css'
					integrity='sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ'
					crossOrigin='anonymous'
				/>

				{/* external scripts */}
				<script
					src='https://code.jquery.com/jquery-3.2.1.slim.min.js'
					integrity='sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN'
					crossOrigin='anonymous'
				></script>
				<script
					src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js'
					integrity='sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q'
					crossOrigin='anonymous'
				></script>
				<script
					src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
					integrity='sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl'
					crossOrigin='anonymous'
				></script>
				<script src='https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js'></script>

				{/* internal scripts */}
				<script src='/js/replacer.js'></script>
				<script src='/js/bootstrap-form-validation.js'></script>
				<script src='/js/google-analytics.js'></script>
			</Head>

			<Navbar />

			<Component {...pageProps} />

			<Footer />
		</>
	);
}
