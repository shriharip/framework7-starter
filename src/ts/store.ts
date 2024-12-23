
import { createStore } from 'framework7/lite';

interface State {
	user: {
		uid: string;
		displayName: string;
		email: string;
		photoURL: string;
	};
	activities: Activity[];
}

interface Activity {
	id: string;
	orgName: string;
	orgLogo: string;
	paymentAmount: number;
	paymentDate: Date;
}

const store = createStore({
  state: {
		user: {
			uid: '',
			displayName: '',
			email: '',
			photoURL: '',
		},
		activities: [
      {
        id: '1',
				orgName: 'Apple iPhone 8',
				orgLogo: '',
				paymentAmount: 100,
				paymentDate: new Date(),
      },
    ]
  },
  getters: {
    products({ state }: { state: State }) {
			return state.activities;
    }
  },
  actions: {
		addActivity({ state }: { state: State }, activity: Activity) {
			state.activities = [...state.activities, activity];
    },
		removeActivity({ state }: { state: State }, activityId: string) {
			state.activities = state.activities.filter((activity) => activity.id !== activityId);
		},
		updateUser({ state }: { state: State }, user: State['user']) {
			if (user) {
				state.user.uid = user.uid;
				state.user.displayName = user.displayName;
				state.user.email = user.email;
				state.user.photoURL = user.photoURL;
			}
		}
  },
})
export default store;
