import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import CarparkDetails from './pages/CarparkDetails';
import WhereIPark from './pages/WhereIPark';

function App() {
  return (<BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/carpark/*' element={<CarparkDetails />} />
          <Route path='/where-i-park' element={<WhereIPark />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
