import React from 'react';
import { useSession, signIn } from 'next-auth/client';

import Navbar from './Navbar';
import Footer from './Footer';

const PUBLIC_ROUTES = ['/', '/faq', '/auth/login', '/auth/logout', '/auth/verify-request'];

export default function Layout({ children }: { children: React.ReactNode }) {
	const [session, loading] = useSession();

	if (loading) {
		return null;
	}

	if (!PUBLIC_ROUTES.includes(window?.location?.pathname) && !session) {
		signIn();
		return null;
	}

	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
