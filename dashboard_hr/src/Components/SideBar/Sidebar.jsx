// Bagian: Komponen Sidebar
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Bagian: Import Router
import { 
  LayoutDashboard, Users, CreditCard, 
  Calendar, Settings, Building2 
} from 'lucide-react';
import './sidebar.css'; 

const Sidebar = () => {
  const location = useLocation(); // Bagian: Deteksi Halaman Aktif
  
  // Bagian: Daftar Menu Sidebar
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/data-karyawan', name: 'Data Karyawan', icon: <Users size={18} /> },
    { path: '/devisi', name: 'Divisi', icon: <Building2 size={18} /> },
    { path: '/gaji', name: 'Gaji', icon: <CreditCard size={18} /> },
    { path: '/cuti', name: 'Cuti', icon: <Calendar size={18} /> },
  ];

  return (
    <aside className="sidebar_og">
      <div className="sidebar-header_og">
        <img 
            src="/logo.svg" 
            alt="Logo HRIS System" 
            className="sidebar-logo" 
        />
        <div className="logo-text">
            <h2>HRIS System</h2>
            <span>Manajemen Karyawan</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          // Bagian: Cek Menu Aktif
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.name}
              to={item.path} 
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;