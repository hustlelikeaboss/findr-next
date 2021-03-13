import { Provider } from 'next-auth/client';

import HtmlHead from '../components/HtmlHead';
import Layout from '../components/Layout';

import '../styles/replacer.css';
import '../styles/custom.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<HtmlHead />

			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
