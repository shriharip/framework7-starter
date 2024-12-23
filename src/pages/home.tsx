import React from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
	Toolbar,
	Card,
  Block,
  BlockTitle,
  List,
  ListItem,
	Button,
	Fab,
	Icon
} from 'framework7-react';

import { useTranslation } from 'react-i18next';
import { getFirestore, doc } from 'firebase/firestore';
import { useFirebaseApp, useFirestoreDocData } from 'reactfire';
import store from '@/ts/store';

const HomePage = () => {
	const { t, i18n } = useTranslation();

	console.log('store', store.state.user);
	return (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar large sliding={false}>
      <NavLeft>
        <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" />
      </NavLeft>
				<NavTitle sliding>Crosscard</NavTitle>
      <NavRight>
        <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="right" />
      </NavRight>
      <NavTitleLarge>Crosscard</NavTitleLarge>
    </Navbar>

			{/* Page content */}
			<BlockTitle>{t('homePage.cardLabelOne')}</BlockTitle>
    <Block>
				<Card content={t('homePage.cardContent')} />
			</Block>



			<BlockTitle>Modals</BlockTitle>
			<List strong inset dividersIos>
      <ListItem link="/about/" title="About"/>
      <ListItem link="/form/" title="Form"/>
			</List>

			<BlockTitle>Popup and Login Screen</BlockTitle>
    <Block className="grid grid-cols-2 grid-gap">
      <Button fill popupOpen="#my-popup">Popup</Button>
				{/* <Button fill loginScreenOpen="#my-login-screen">Login Screen</Button> */}
				<Link href="/login/">Login Screen</Link>
    </Block>

    <BlockTitle>Panels</BlockTitle>
    <Block className="grid grid-cols-2 grid-gap">
      <Button fill panelOpen="left">Left Panel</Button>
      <Button fill panelOpen="right">Right Panel</Button>
    </Block>

    <List strong inset dividersIos>
      <ListItem
        title="Dynamic (Component) Route"
        link="/dynamic-route/blog/45/post/125/?foo=bar#about"
      />
      <ListItem
        title="Default Route (404)"
        link="/load-something-that-doesnt-exist/"
      />
      <ListItem
        title="Request Data & Load"
        link="/request-and-load/user/123456/"
      />
			</List>

			{/* FAB buttons for scan */}
			<Fab href='/scan' position="right-bottom" slot="fixed">
				<Icon ios="f7:qrcode_viewfinder" md="material:qr_code_scanner" />
			</Fab>
  </Page>
	);
}
export default HomePage;