import type React from 'react';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { FirestoreProvider, AuthProvider, StorageProvider, useFirebaseApp } from 'reactfire';
import AuthWrapper from '../components/auth/auth_wrapper';



export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {

	const firebaseApp = useFirebaseApp();
	const firestoreInstance = getFirestore(firebaseApp);
	const auth = getAuth(firebaseApp);
	const storage = getStorage(firebaseApp);


	return (

		<FirestoreProvider sdk={firestoreInstance}>
			<AuthProvider sdk={auth}>
				<StorageProvider sdk={storage}>
					<AuthWrapper>
						{children}
					</AuthWrapper>
				</StorageProvider>
			</AuthProvider>
		</FirestoreProvider>
	);
}