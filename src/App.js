import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/router';

function App() {
  const renderPublicRoutes = () => {};
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Hello world!</div>} />
      </Routes>
    </Router>
  );
}

export default App;
