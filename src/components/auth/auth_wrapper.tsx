import { useUser } from 'reactfire';
import { Progressbar } from 'framework7-react';
import store from '@/ts/store';

const AuthWrapper = ({ children }: {
	children: React.ReactNode;
}) => {
	const { status, data: user } = useUser();

	store.dispatch('updateUser', user);



	if (status === 'loading') {
		return <Progressbar infinite />
	}

	return (
		<>
			{children}
		</>);
};

export default AuthWrapper;