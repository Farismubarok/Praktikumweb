// src/Pages/Gaji/Gaji.jsx

import React, { useState, useEffect } from 'react';
import './Gaji.css'; 
import { fetchGaji, deleteGaji, formatGajiId, formatRupiah, formatDate } from '../../utils/api';

const Gaji = () => {
  const [salaries, setSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data gaji
  const loadGaji = async () => {
    setLoading(true);
    const data = await fetchGaji();
    setSalaries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadGaji();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSalaries = salaries.filter(sal =>
    sal.nama_lengkap?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sal.status_pembayaran?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gaji-page-wrapper"> 
      
      <header className="page-header">
        <div>
            <h1>Data Gaji Karyawan</h1>
            <p className="page-subtitle">Kelola dan lihat riwayat penggajian karyawan per periode.</p>
        </div>
        <button className="btn-primary-gaji">
          + Proses Gaji Baru
        </button>
      </header>

      <div className="gaji-controls">
        <input 
          type="text" 
          placeholder="Cari nama atau status..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="gaji-table-container dashboard-card">
        <table className="gaji-table">
          <thead>
            <tr>
              <th>ID Gaji</th>
              <th>Nama Karyawan</th>
              <th>Jabatan</th>
              <th>Gaji Pokok</th>
              <th>Tunjangan</th>
              <th>Bonus</th>
              <th>Total</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="empty-state">Loading...</td>
              </tr>
            ) : filteredSalaries.length > 0 ? (
              filteredSalaries.map((sal) => {
                const total = (sal.gaji_pokok || 0) + (sal.tunjangan || 0) + (sal.bonus || 0);
                return (
                  <tr key={sal.id}>
                    <td>{formatGajiId(sal.id)}</td>
                    <td>{sal.nama_lengkap || '-'}</td>
                    <td>{sal.jabatan || '-'}</td>
                    <td>{formatRupiah(sal.gaji_pokok)}</td>
                    <td>{formatRupiah(sal.tunjangan)}</td>
                    <td>{formatRupiah(sal.bonus)}</td>
                    <td className="text-success font-bold">{formatRupiah(total)}</td>
                    <td>
                      <span className={`status-badge status-${sal.status_pembayaran?.toLowerCase()}`}>
                        {sal.status_pembayaran}
                      </span>
                    </td>
                    <td>
                      <button className="btn-action view">Detail Slip</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="empty-state">Data penggajian tidak ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Gaji;