
import HomePage from '@/pages/home.tsx';
import AboutPage from '@/pages/about.tsx';
import FormPage from '@/pages/form.tsx';
import CatalogPage from '@/pages/catalog.tsx';
import ProductPage from '@/pages/product.tsx';
import SettingsPage from '@/pages/settings.tsx';

import DynamicRoutePage from '@/pages/dynamic-route.tsx';
import RequestAndLoad from '@/pages/request-and-load.tsx';
import NotFoundPage from '@/pages/404.tsx';

import type { Router } from 'framework7/types';
import ScanPage from '@/pages/scan';
import { LoginPage } from '@/pages/login';

const routes: Array<Router.RouteParameters> = [
  {
    path: '/',
    component: HomePage,
	},
	{
		path: '/scan',
		component: ScanPage,
	},
	{
		path: '/about/',
		component: AboutPage,
	},
	{
		path: '/login',
		component: LoginPage,
	},
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async:  ({ router, to, resolve }) => {
      // App instance
      const app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      const userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(() => {
        // We got user data from request
        const user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
