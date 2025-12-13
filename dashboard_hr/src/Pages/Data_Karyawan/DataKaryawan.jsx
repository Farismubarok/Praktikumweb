// src/Pages/Data_Karyawan/DataKaryawan.jsx
import React, { useState, useEffect } from 'react';
import './DataKaryawan.css';
import { fetchKaryawan, deleteKaryawan, formatEmployeeId, formatDate } from '../../utils/api';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Komponen Modal dan Form
import Model from '../../Components/model/model';
import TambahKaryawan from '../../Forms/Tambah_Karyawan/TambahKaryawan';

const DataKaryawan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [karyawanList, setKaryawanList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data saat komponen dimuat
  const loadKaryawan = async () => {
    setLoading(true);
    const data = await fetchKaryawan();
    setKaryawanList(data);
    setLoading(false);
  };

  useEffect(() => {
    loadKaryawan();
  }, []);

  // Handle hapus karyawan
  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus karyawan ini?')) {
      await deleteKaryawan(id);
      loadKaryawan(); // Refresh data
    }
  };

  return (
    <div className="dashboard-container">  
      <main className="main-content1">
        
        <div className="content-wrapper">
          <div className="page-header">
            <div>
              <h1>Data Karyawan</h1>
              <p className="page-subtitle">Kelola data dan informasi karyawan</p>
            </div>
            
            <button className="btn-primary-data" onClick={() => setIsModalOpen(true)}>
              + Tambah Karyawan
            </button>
          </div>

          <div className="card">
            {/* ... Bagian Filter dan Dropdown Tetap Sama ... */}
            <div className="filter-section">
              <div className="search-input1">
                <input type="text" className="search-input" placeholder="Cari nama, ID, atau jabatan..." />
              </div>
              <div className="dropdowns">
                <select><option>Semua Divisi</option></select>
                <select><option>Semua Status</option></select>
              </div>
            </div>

            {/* ... Bagian Tabel Tetap Sama ... */}
            <div className="data-table-container dashboard-card">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>ID Karyawan</th>
                    <th>Nama Lengkap</th>
                    <th>Email</th>
                    <th>Jabatan</th>
                    <th>Divisi</th>
                    <th>Tanggal Masuk</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="8" style={{textAlign: 'center'}}>Loading...</td></tr>
                  ) : karyawanList.length === 0 ? (
                    <tr><td colSpan="8" style={{textAlign: 'center'}}>Belum ada data karyawan</td></tr>
                  ) : (
                    karyawanList.map((emp) => (
                      <tr key={emp.id}>
                        <td className="emp-id">{formatEmployeeId(emp.id)}</td>
                        <td>
                          <div className="user-cell">
                            <div><strong>{emp.nama_lengkap}</strong></div>
                          </div>
                        </td>
                        <td>{emp.email}</td>
                        <td>{emp.jabatan}</td>
                        <td>{emp.nama_divisi || '-'}</td>
                        <td>{formatDate(emp.tanggal_masuk)}</td>
                        <td>
                          <span className={`badge ${emp.status?.toLowerCase().replace(' ', '-')}`}>
                            {emp.status}
                          </span>
                        </td>
                        <td>
                            <button className="btn-action edit">Edit</button>
                            <button className="btn-action delete" onClick={() => handleDelete(emp.id)}>Hapus</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {/* <div className="pagination">
              <span>Menampilkan 1 - 8 dari 12 karyawan</span>
              <div className="page-controls">
                <button className="page-btn"><ChevronLeft size={16} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn"><ChevronRight size={16} /></button>
              </div>
            </div> */}
            
          </div>
        </div>

        {/* Render Modal */}
        <Model 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Tambah Karyawan Baru"
        >
          <TambahKaryawan 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={loadKaryawan}
          />
        </Model>

      </main>
    </div>
  );
};

export default DataKaryawan;