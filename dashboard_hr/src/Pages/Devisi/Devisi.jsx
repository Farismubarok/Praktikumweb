// src/Pages/Devisi/Devisi.jsx

import React, { useState, useEffect } from 'react';
import './Devisi.css'; 
import { fetchDivisi, deleteDivisi, formatDivisiId, formatRupiah } from '../../utils/api';

const Devisi = () => {
  const [divisions, setDivisions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data divisi
  const loadDivisi = async () => {
    setLoading(true);
    const data = await fetchDivisi();
    setDivisions(data);
    setLoading(false);
  };

  useEffect(() => {
    loadDivisi();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus divisi ini?')) {
      await deleteDivisi(id);
      loadDivisi();
    }
  };

  const filteredDivisions = divisions.filter(div =>
    div.nama_divisi?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="devisi-page-wrapper"> 
      
      <header className="page-header">
        <div>
            <h1>Data Divisi</h1>
            <p className="page-subtitle">Kelola daftar semua divisi dan penanggung jawab di perusahaan.</p>
        </div>
        <button className="btn-primary-divisi">
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
              <th>Anggaran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="empty-state">Loading...</td>
              </tr>
            ) : filteredDivisions.length > 0 ? (
              filteredDivisions.map((div) => (
                <tr key={div.id}>
                  <td>{formatDivisiId(div.id)}</td>
                  <td>{div.nama_divisi}</td>
                  <td>{div.nama_kepala || '-'}</td>
                  <td>{formatRupiah(div.anggaran)}</td>
                  <td>
                    <button className="btn-action edit">Edit</button>
                    <button className="btn-action delete" onClick={() => handleDelete(div.id)}>Hapus</button>
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