import Home from '~/pages/Home';
import System from '~/pages/System';
export const publicRoutes = [
  {
    path: '/',
    page: Home,
  },
];

export const privateRoutes = [
  {
    path: '/system',
    page: System,
  },
];
