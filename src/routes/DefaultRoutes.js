import { Routes, Route, Navigate } from 'react-router-dom';
import {
  FormsDownload,
  Home,
  Introduces,
  News,
  Notifications,
  Post,
} from '~/containers/defaults';
import { DefaultLayout } from '~/layouts';
import { path } from '~/utils';

const defaultRoutes = [
  { id: Math.random(), Container: Home, path: path.HOME },
  { id: Math.random(), Container: Notifications, path: path.NOTIFICATION },
  { id: Math.random(), Container: Introduces, path: path.INTRODUCE },
  { id: Math.random(), Container: News, path: path.NEWS },
  { id: Math.random(), Container: FormsDownload, path: path.FORMS_DOWNLOAD },
  { id: Math.random(), Container: Post, path: path.POST },
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
