import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Scheduler from './pages/Scheduler';
import Chores from './pages/Chores';
import Group from './pages/Groups';
import Layout from './components/Layout';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/chores" element={<Chores />} />
          <Route path="/group" element={<Group />} />
        </Routes>
      </Layout>
    </Router>
  );
}
