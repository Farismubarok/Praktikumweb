// src/Pages/Cuti/Cuti.jsx

import React, { useState, useEffect } from 'react';
import './cuti.css'; 
import { fetchCuti, deleteCuti, updateStatusCuti, formatCutiId, formatDate } from '../../utils/api';

const Cuti = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data cuti
  const loadCuti = async () => {
    setLoading(true);
    const data = await fetchCuti();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCuti();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCancel = async (id) => {
    if (window.confirm('Yakin ingin membatalkan pengajuan cuti ini?')) {
      await deleteCuti(id);
      loadCuti();
    }
  };

  const handleApprove = async (id) => {
    await updateStatusCuti(id, 'Disetujui');
    loadCuti();
  };

  const handleReject = async (id) => {
    await updateStatusCuti(id, 'Ditolak');
    loadCuti();
  };

  const filteredRequests = requests.filter(req =>
    req.nama_lengkap?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.jenis_cuti?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cuti-page-wrapper"> 
      
      <header className="page-header">
        <div>
            <h1>Pengajuan Cuti</h1>
            <p className="page-subtitle">Kelola pengajuan cuti dan lihat riwayat status cuti.</p>
        </div>
        <button className="btn-primary-cuti">
          + Ajukan Cuti Baru
        </button>
      </header>

      <div className="cuti-controls">
        <input 
          type="text" 
          placeholder="Cari nama atau status cuti..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="cuti-table-container dashboard-card">
        <table className="cuti-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Karyawan</th>
              <th>Jenis Cuti</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Akhir</th>
              <th>Durasi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="empty-state">Loading...</td>
              </tr>
            ) : filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td>{formatCutiId(req.id)}</td>
                  <td>{req.nama_lengkap || '-'}</td>
                  <td>{req.jenis_cuti}</td>
                  <td>{formatDate(req.tanggal_mulai)}</td>
                  <td>{formatDate(req.tanggal_selesai)}</td>
                  <td>{req.durasi} hari</td>
                  <td>
                    <span className={`status-badge status-${req.status?.toLowerCase()}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action view">Detail</button>
                    {req.status === 'Menunggu' && (
                      <>
                        <button className="btn-action edit" onClick={() => handleApprove(req.id)}>Setujui</button>
                        <button className="btn-action delete" onClick={() => handleReject(req.id)}>Tolak</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="empty-state">Tidak ada riwayat pengajuan cuti.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Cuti;