import React, { useState, useEffect } from 'react';
import { getDevice }  from 'framework7/lite-bundle';
import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
	BlockFooter,
	Fab,
	FabButtons,
	FabButton,
	Icon
} from 'framework7-react';
import { FirebaseAppProvider } from 'reactfire';

import capacitorApp from '../ts/capacitor-app';
import routes from '../ts/routes';
import store from '../ts/store';
import '../ts/i18';
import { FirebaseProvider } from '@/providers/firebase_provider';


const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

let path: string;
let url: URL;

const MyApp = () => {
  // Login screen demo data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
	const device = getDevice();

  // Framework7 Parameters
  const f7params = {
    name: 'crosscard', // App name
      theme: 'auto', // Automatic theme detection
      colors: {
        primary: '#ccb647',
      },

			dark: 'auto',
			device: device,
      // App store
      store: store,
      // App routes
      routes: routes,

      // Register service worker (only on production build)
      serviceWorker: process.env.NODE_ENV ==='production' ? {
        path: '/service-worker.js',
      } : {},
      // Input settings
      input: {
        scrollIntoViewOnFocus: device.capacitor,
        scrollIntoViewCentered: device.capacitor,
      },
      // Capacitor Statusbar settings
      statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
	};



  const alertLoginData = () => {
    f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
      f7.loginScreen.close();
    });
  }
  f7ready(() => {

    // Init capacitor APIs (see capacitor-app.js)
    if (f7.device.capacitor) {
      capacitorApp.init(f7);
    }
    // Call F7 APIs here
  });

	return (
		<FirebaseAppProvider firebaseConfig={firebaseConfig}>
			<FirebaseProvider>
				<App {...f7params}>

					{/* Left panel with cover effect*/}
					{/* <Panel left cover dark>
	<View>
		<Page>
			<Navbar title="Left Panel"/>
			<Block>Left panel content goes here</Block>
		</Page>
	</View>
</Panel> */}


					{/* Right panel with reveal effect*/}
					<Panel right reveal dark>
						<View>
							<Page>
								<Navbar title="Right Panel" />
								<Block>Right panel content goes here</Block>
							</Page>
						</View>
					</Panel>



					{/* Views/Tabs container */}
					<Views tabs className="safe-areas">
						{/* Tabbar for switching views-tabs */}
						<Toolbar tabbar icons bottom>
							<Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconMd="material:home" text="Home" />
							<Link tabLink="#view-catalog" iconIos="f7:square_list_fill" iconMd="material:view_list" text="Catalog" />
							<Link tabLink="#view-settings" iconIos="f7:gear" iconMd="material:settings" text="Settings" />
						</Toolbar>

						{/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
						<View id="view-home" main tab tabActive url="/" />

						{/* Catalog View */}
						<View id="view-catalog" name="catalog" tab url="/catalog/" />

						{/* Settings View */}
						<View id="view-settings" name="settings" tab url="/settings/" />

					</Views>

					{/* Popup */}
					<Popup id="my-popup">
						<View>
							<Page>
								<Navbar title="Scan">
									<NavRight>
										<Link popupClose>Close</Link>
									</NavRight>
								</Navbar>
								<Block>

								</Block>
							</Page>
						</View>
					</Popup>
				</App>
			</FirebaseProvider>
		</FirebaseAppProvider>
  )
}
export default MyApp;