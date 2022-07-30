import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MainLayout, SystemLayout } from '~/layouts';
import { publicRoutes, privateRoutes } from '~/router';

function App() {
  const renderRoutes = (layout, routes) => {
    return routes?.map((route) => {
      const Layout = layout;
      const Page = route.page;
      const path = route.path;
      return (
        <Route
          path={path}
          element={
            <Layout>
              <Page />
            </Layout>
          }
        />
      );
    });
  };
  return (
    <Router>
      <Routes>
        {/* Render public routes */}
        {renderRoutes(MainLayout, publicRoutes)}
        {/* Render private routes */}
        {renderRoutes(SystemLayout, privateRoutes)}
        {/* Catch another routes */}
        {/* NotFound Page */}
      </Routes>
    </Router>
  );
}

export default App;
