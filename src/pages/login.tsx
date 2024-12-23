import React, { useState } from 'react';

import {
	Page,
	List,
	ListButton,
	BlockFooter,
	LoginScreenTitle,
	Link,
} from 'framework7-react';

import { type Auth, signInAnonymously } from 'firebase/auth';

import type { routeProps } from '@/types';
import { useAuth } from 'reactfire';


const signIn = async (auth: Auth) => {
	await signInAnonymously(auth);
}

export const LoginPage = () => {

	const auth = useAuth();

	return (

		<Page loginScreen>
			<LoginScreenTitle>Login</LoginScreenTitle>

			<List>
				<ListButton title="Sign In" onClick={() => signIn(auth)} />
				<Link back>Go Back</Link>
				<BlockFooter>
					Some text about login information.<br />Click "Sign In" to close Login Screen
				</BlockFooter>
			</List>
		</Page>
	);
}