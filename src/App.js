import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthRoutes, DefaultRoutes, SystemsRoutes } from '~/routes';

export default function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/system/*" element={<SystemsRoutes />} />
      <Route path="/404" element={<div>NotFound</div>} />
      <Route path="/*" element={<DefaultRoutes />} />
    </Routes>
  );
}
