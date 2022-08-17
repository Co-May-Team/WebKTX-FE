import { Routes, Route, Navigate } from 'react-router-dom';
import { SystemLayout } from '~/layouts';

const systemsRoutes = [
  {
    id: Math.random(),
    Container: Navigate,
    path: '*',
    replace: true,
    to: '/404',
  },
];

export default function SystemsRoutes() {
  const renderRoutes = () => {
    return systemsRoutes.map((item) => {
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
    <SystemLayout>
      <Routes>{renderRoutes()}</Routes>
    </SystemLayout>
  );
}
