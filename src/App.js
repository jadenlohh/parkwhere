import './App.css';
import Navbar from './component/Navbar';
import CarparkList from './component/carpark/CarparkList';

function App() {
  return (
    <div className="App container">
      <Navbar />

      <CarparkList />
    </div>
  );
}

export default App;
