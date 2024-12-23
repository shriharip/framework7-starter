import React from 'react';
import { Page, Navbar, Block, BlockTitle } from 'framework7-react';
import { routeProps } from '@/types';
import { Organization } from '@/components/payment_page/header';
import { PaymentBlock } from '@/components/payment_page/payment';

const AboutPage = (props: routeProps) => {
	const { f7route, f7router } = props;


	return (
  <Page>
    <Navbar title="About" backLink="Back" />
			<Organization />
			<PaymentBlock />
  </Page>
);
}

export default AboutPage;
