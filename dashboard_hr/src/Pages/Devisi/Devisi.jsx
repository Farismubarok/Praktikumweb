// src/Pages/Devisi/Devisi.jsx

import React, { useState } from 'react';
import './Devisi.css'; 
// Asumsi DashboardLayout/Layout Wrapper sudah di-handle di App.jsx atau Index.css

// Data Divisi Simulasi
const MOCK_DIVISIONS = [
  { id: 101, nama: 'IT (Information Technology)', employees: 45, head: 'Bambang Sudiro' },
  { id: 102, nama: 'HRD (Human Resources Development)', employees: 10, head: 'Siti Rahayu' },
  { id: 103, nama: 'Marketing', employees: 25, head: 'Budi Santoso' },
  { id: 104, nama: 'Finance', employees: 15, head: 'Dewi Lestari' },
  { id: 105, nama: 'Operational', employees: 50, head: 'Ahmad Wijaya' },
];

const Devisi = () => {
  const [divisions, setDivisions] = useState(MOCK_DIVISIONS);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDivisions = divisions.filter(div =>
    div.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="devisi-page-wrapper"> 
      
      <header className="page-header">
        <div>
            <h1>Data Divisi</h1>
            <p className="page-subtitle">Kelola daftar semua divisi dan penanggung jawab di perusahaan.</p>
        </div>
        <button className="btn-primary">
          + Tambah Divisi
        </button>
      </header>

      <div className="devisi-controls">
        <input 
          type="text" 
          placeholder="Cari nama divisi..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="devisi-table-container dashboard-card">
        <table className="devisi-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Divisi</th>
              <th>Kepala Divisi</th>
              <th>Jml. Karyawan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredDivisions.length > 0 ? (
              filteredDivisions.map((div) => (
                <tr key={div.id}>
                  <td>{div.id}</td>
                  <td>{div.nama}</td>
                  <td>{div.head}</td>
                  <td>{div.employees}</td>
                  <td>
                    <button className="btn-action edit">Edit</button>
                    <button className="btn-action delete">Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">Data divisi tidak ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Devisi;