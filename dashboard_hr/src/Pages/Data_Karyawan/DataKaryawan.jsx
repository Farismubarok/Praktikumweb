// src/Pages/Data_Karyawan/DataKaryawan.jsx
import React from 'react';
import './DataKaryawan.css';
import { employeeData } from './Data';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const DataKaryawan = () => {
  return (
    <div className="dashboard-container">  
      <main className="main-content">
        
        <div className="content-wrapper">
          <div className="page-header">
            <div>
              <h1>Data Karyawan</h1>
              <p>Kelola data dan informasi karyawan</p>
            </div>
            <button className="btn-primary">
              <Plus size={16} /> Tambah Karyawan
            </button>
          </div>

          <div className="card">
            {/* Filters */}
            <div className="filter-section">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon-sm" />
                <input type="text" placeholder="Cari nama, ID, atau jabatan..." />
              </div>
              <div className="dropdowns">
                <select><option>Semua Divisi</option></select>
                <select><option>Semua Status</option></select>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>ID Karyawan</th>
                    <th>Foto & Nama Lengkap</th>
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
                          <img src={emp.avatar} alt={emp.name} />
                          <div>
                            <strong>{emp.name}</strong>
                            <span>{emp.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>{emp.role}</td>
                      <td>{emp.department}</td>
                      <td>{emp.joinDate}</td>
                      <td>
                        <span className={`badge ${emp.status.toLowerCase().replace(' ', '-')}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <button className="icon-btn"><Edit2 size={16} /></button>
                          <button className="icon-btn"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <span>Menampilkan 1 - 8 dari 12 karyawan</span>
              <div className="page-controls">
                <button className="page-btn"><ChevronLeft size={16} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataKaryawan;