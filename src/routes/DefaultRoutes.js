import { Routes, Route, Navigate } from 'react-router-dom';
import {
  FormsDownload,
  Home,
  Introduces,
  News,
  Notifications,
} from '~/containers/defaults';
import { DefaultLayout } from '~/layouts';

const defaultRoutes = [
  { id: Math.random(), Container: Home, path: '/' },
  { id: Math.random(), Container: Notifications, path: '/notifications' },
  { id: Math.random(), Container: Introduces, path: '/introduces' },
  { id: Math.random(), Container: News, path: '/news' },
  { id: Math.random(), Container: FormsDownload, path: '/form-download' },
  {
    id: Math.random(),
    Container: Navigate,
    path: '*',
    replace: true,
    to: '/404',
  },
];

export default function DefaultRoutes() {
  const renderRoutes = () => {
    return defaultRoutes.map((item) => {
      const Container = item.Container;
      return (
        <Route
          key={item.id}
          path={item.path}
          element={<Container replace={item?.replace} to={item?.to} />}
        />
      );
    });
  };
  return (
    <DefaultLayout>
      <Routes>
        {renderRoutes()}
        {/* <Route path="*" element={<div>Not Found</div>} /> */}
      </Routes>
    </DefaultLayout>
  );
}
