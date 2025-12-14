import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/SideBar/Sidebar';
import Navbar from './Components/Navbar/Navbar';
import './App.css';

// Bagian: Pages
import Index from './Pages/Index/Index';
import DataKaryawan from './Pages/Data_Karyawan/DataKaryawan';
import Devisi from './Pages/Devisi/Devisi';
import Cuti from './Pages/Cuti/Cuti';
import Gaji from './Pages/Gaji/Gaji';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <main className="content-area">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/data-karyawan" element={<DataKaryawan />} />
              <Route path="/devisi" element={<Devisi />} />
              <Route path="/gaji" element={<Gaji />} />
              <Route path="/cuti" element={<Cuti />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;