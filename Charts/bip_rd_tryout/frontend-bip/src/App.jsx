import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OldPlayground from './OldPlayground';
import GridLayout from './components/GridLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GridLayout />} />
        <Route path="/old" element={<OldPlayground />} />
      </Routes>
    </Router>
  );
}