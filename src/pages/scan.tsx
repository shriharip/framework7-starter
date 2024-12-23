import React from 'react';
import { Page, Navbar, List, ListItem, Block, Button, useStore, f7 } from 'framework7-react';

import { routeProps } from '@/types';
import { Scanner } from '@yudiel/react-qr-scanner';

const ScanPage = (props: routeProps) => {

	const { f7router } = props;
	let url;
	let path;


	return (
		<Page name="scan">
			<Navbar title="Scan the code!" backLink='true' />

			<Scanner onScan={(result) => {
				url = new URL(result[0].rawValue);
				path = url.pathname;
				// f7.dialog.alert(`path: ${path}`);
				f7router.navigate(path);
			}} />

		</Page>
	);
};

export default ScanPage;
