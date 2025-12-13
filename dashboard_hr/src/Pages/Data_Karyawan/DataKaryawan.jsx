// src/Pages/Data_Karyawan/DataKaryawan.jsx
import React, { useState } from 'react'; // 1. Import useState
import './DataKaryawan.css';
import { employeeData } from './Data';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

// 2. Import Komponen Modal dan Form Baru
import Model from '../../Components/model/model';
import TambahKaryawan from '../../Forms/Tambah_Karyawan/TambahKaryawan';

const DataKaryawan = () => {
  // 3. State untuk kontrol Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="dashboard-container">  
      <main className="main-content1">
        
        <div className="content-wrapper">
          <div className="page-header">
            <div>
              <h1>Data Karyawan</h1>
              <p className="page-subtitle">Kelola data dan informasi karyawan</p>
            </div>
            
            {/* 4. Pasang Event onClick pada tombol Tambah */}
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
                  {employeeData.map((emp) => (
                    <tr key={emp.id}>
                      <td className="emp-id">{emp.id}</td>
                      <td>
                        <div className="user-cell">
                          <div><strong>{emp.name}</strong></div>
                        </div>
                      </td>
                      <td>{emp.email}</td>
                      <td>{emp.role}</td>
                      <td>{emp.department}</td>
                      <td>{emp.joinDate}</td>
                      <td>
                        <span className={`badge ${emp.status.toLowerCase().replace(' ', '-')}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td>
                          <button className="btn-action edit">Edit</button>
                          <button className="btn-action delete">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Tetap Sama */}
            <div className="pagination">
              {/* ... kode pagination ... */}
            </div>
          </div>
        </div>

        {/* 5. Render Modal di sini (Di luar content-wrapper tapi di dalam main) */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Tambah Karyawan Baru"
        >
          {/* Masukkan Form Multi-step ke dalam Modal */}
          <AddEmployeeForm onClose={() => setIsModalOpen(false)} />
        </Modal>

      </main>
    </div>
  );
};

export default DataKaryawan;