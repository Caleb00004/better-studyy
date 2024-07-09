import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ContextProvider } from '@/components/context/flashcardcontext';

import '@/styles/globals.css';
import { initGA, logPageView } from '@/ga';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		initGA();
		logPageView();
		router.events.on('routeChangeComplete', logPageView);

		return () => {
			router.events.off('routeChangeComplete', logPageView);
		};
	}, []);

	return (
		<>
			<Script
				strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=G-M48YDC11FD`}
				id='interactive1'
			/>
			<Script
				id='interactive2'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-M48YDC11FD');
						`,
				}}
			/>
			<ContextProvider>
				<Component {...pageProps} />
			</ContextProvider>
		</>
	);
}
