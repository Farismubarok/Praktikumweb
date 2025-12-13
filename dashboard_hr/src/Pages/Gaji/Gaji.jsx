// src/Pages/Gaji/Gaji.jsx

import React, { useState, useEffect } from 'react';
import './Gaji.css'; 
import { fetchGaji, deleteGaji, formatGajiId, formatRupiah, formatDate } from '../../utils/api';
import { toast } from 'sonner';
import Model from '../../Components/model/model';
import SelectKaryawan from '../../Forms/SelectKaryawan/SelectKaryawan';
import EditGaji from '../../Forms/EditGaji/EditGaji';

const Gaji = () => {
  const [salaries, setSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedKaryawan, setSelectedKaryawan] = useState(null);
  const [editingGaji, setEditingGaji] = useState(null);

  // Fetch data gaji
  const loadGaji = async () => {
    setLoading(true);
    try {
      const data = await fetchGaji();
      setSalaries(data);
    } catch (error) {
      toast.error('Gagal memuat data gaji');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGaji();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleOpenUpdateGaji = () => {
    setModalStep(1);
    setSelectedKaryawan(null);
    setEditingGaji(null);
    setIsModalOpen(true);
  };

  // Buka langsung ke edit jika ada karyawan/gaji yang dipilih
  const handleEditGaji = (sal) => {
    setSelectedKaryawan({
      id: sal.id_karyawan,
      nama_lengkap: sal.nama_lengkap,
      nama_divisi: sal.nama_divisi,
    });
    setEditingGaji(sal);
    setModalStep(2);
    setIsModalOpen(true);
  };

  const handleSelectKaryawan = (emp) => {
    setSelectedKaryawan(emp);
    setEditingGaji(null);
    setModalStep(2);
  };

  const handleChangeKaryawan = () => {
    setModalStep(1);
    setSelectedKaryawan(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data gaji ini?')) {
      try {
        await deleteGaji(id);
        toast.success('Data gaji berhasil dihapus');
        loadGaji();
      } catch (error) {
        toast.error('Gagal menghapus data gaji');
        console.error(error);
      }
    }
  };

  // Filter by status
  const filteredSalaries = salaries.filter(sal => {
    const matchSearch = sal.nama_lengkap?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'Semua Status' || sal.status_pembayaran === statusFilter;
    return matchSearch && matchStatus;
  });

  // Calculate statistics
  const totalPayroll = salaries.reduce((sum, sal) => sum + (sal.gaji_pokok + sal.tunjangan + sal.bonus), 0);
  const sudahDibayar = salaries.filter(sal => sal.status_pembayaran === 'Sudah Dibayar').length;
  const pending = salaries.filter(sal => sal.status_pembayaran === 'Pending').length;
  const rataRataGaji = salaries.length > 0 ? Math.round(totalPayroll / salaries.length) : 0;

  return (
    <div className="gaji-page-wrapper"> 
      
      <header className="page-header">
        <div>
            <h1>Penggajian</h1>
            <p className="page-subtitle">Kelola gaji dan kompensasi karyawan</p>
        </div>
        <button className="btn-primary-gaji" onClick={handleOpenUpdateGaji}>
          + Update Gaji
        </button>
      </header>

      {/* Stat Cards */}
      <div className="stats-container">
        <div className="stat-card total-payroll">
          <div className="stat-icon">💰</div>
          <p className="stat-label">Total Payroll</p>
          <h3 className="stat-value">{formatRupiah(totalPayroll)}</h3>
        </div>

        <div className="stat-card sudah-dibayar">
          <div className="stat-icon">✓</div>
          <p className="stat-label">Sudah Dibayar</p>
          <h3 className="stat-value">{sudahDibayar}</h3>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <p className="stat-label">Pending</p>
          <h3 className="stat-value">{pending}</h3>
        </div>

        <div className="stat-card rata-rata">
          <div className="stat-icon">$</div>
          <p className="stat-label">Rata-rata Gaji</p>
          <h3 className="stat-value">{formatRupiah(rataRataGaji)}</h3>
        </div>
      </div>

      <div className="gaji-controls">
        <div className="filter-section">
          <span className="filter-icon">⚙️</span>
          <select value={statusFilter} onChange={handleStatusFilter} className="filter-select">
            <option>Semua Status</option>
            <option>Sudah Dibayar</option>
            <option>Pending</option>
            <option>Tunda</option>
          </select>
          <span className="filter-info">Menampilkan {filteredSalaries.length} dari {salaries.length} data</span>
        </div>
      </div>

      <div className="gaji-table-container dashboard-card">
        <table className="gaji-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Karyawan</th>
              <th>Divisi</th>
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
                    <td>
                      <div className="employee-cell">
                        <strong>{sal.nama_lengkap || '-'}</strong>
                        <span className="emp-code">{sal.id_karyawan ? `EMP${String(sal.id_karyawan).padStart(3, '0')}` : ''}</span>
                      </div>
                    </td>
                    <td>{sal.nama_divisi || '-'}</td>
                    <td>{formatRupiah(sal.gaji_pokok)}</td>
                    <td>{formatRupiah(sal.tunjangan)}</td>
                    <td>{formatRupiah(sal.bonus)}</td>
                    <td className="total-cell">{formatRupiah(total)}</td>
                    <td>
                      <span className={`status-badge status-${sal.status_pembayaran?.toLowerCase().replace(' ', '-')}`}>
                        {sal.status_pembayaran}
                      </span>
                    </td>
                    <td className="action-cell">
                      <button 
                        className="btn-edit-icon"
                        onClick={() => handleEditGaji(sal)}
                        title="Edit"
                      >
                        ✏️
                      </button>
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

      {/* Modal 2 Steps */}
      <Model 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setModalStep(1);
          setSelectedKaryawan(null);
        }} 
        title={modalStep === 1 ? 'Update Data Gaji' : 'Update Data Gaji'}
      >
        {modalStep === 1 ? (
          <SelectKaryawan 
            onSelect={handleSelectKaryawan}
            onClose={() => {
              setIsModalOpen(false);
              setModalStep(1);
              setSelectedKaryawan(null);
            }}
          />
        ) : (
          <EditGaji 
            selectedKaryawan={selectedKaryawan}
            onClose={() => {
              setIsModalOpen(false);
              setModalStep(1);
              setSelectedKaryawan(null);
            }}
            onSuccess={loadGaji}
            onChangeKaryawan={handleChangeKaryawan}
          />
        )}
      </Model>
      
    </div>
  );
};

export default Gaji;