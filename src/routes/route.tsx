import { createBrowserRouter } from 'react-router-dom';
import { Root } from './Root';
import ArticlePage from '../pages/ArticlePage/ArticlePage';
import CreatePage from '../pages/CreatePage/CreatePage';
import EditPage from '../pages/EditPage/EditPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage/HomePage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import SignInPage from '../pages/SigInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import MyAricles from '../pages/ProfilePage/MyAricles';
import FavoritedArticles from '../pages/ProfilePage/FavoritedArticles';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: '/login',
            element: <SignInPage />,
          },
          {
            path: '/register',
            element: <SignUpPage />,
          },
          {
            path: '/settings',
            element: <SettingsPage />,
          },
          {
            path: '/editor',
            element: <CreatePage />,
          },
          {
            path: '/editor/:slug',
            element: <EditPage />,
          },
          {
            path: '/article/:slug',
            element: <ArticlePage />,
          },
          {
            path: '/profile/:username',
            element: <ProfilePage />,
            children: [
              {
                index: true,
                element: <MyAricles />,
              },
              {
                path: 'favorites',
                element: <FavoritedArticles />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default route;
