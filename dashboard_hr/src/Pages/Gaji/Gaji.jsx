// src/Pages/Gaji/Gaji.jsx

import React, { useState } from 'react';
import './Gaji.css'; 

// Fungsi Pembantu untuk format mata uang
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

// Data Gaji Simulasi
const MOCK_SALARIES = [
  { id: 1, nama: 'Ahmad Fauzi', divisi: 'IT', periode: 'Des 2024', gajiPokok: 6500000, tunjangan: 1500000, potongan: 250000 },
  { id: 2, nama: 'Siti Rahayu', divisi: 'HRD', periode: 'Des 2024', gajiPokok: 5000000, tunjangan: 1000000, potongan: 200000 },
  { id: 3, nama: 'Budi Santoso', divisi: 'Marketing', periode: 'Nov 2024', gajiPokok: 7200000, tunjangan: 2000000, potongan: 300000 },
  { id: 4, nama: 'Candra Wijaya', divisi: 'IT', periode: 'Des 2024', gajiPokok: 6000000, tunjangan: 1200000, potongan: 200000 },
];

const Gaji = () => {
  const [salaries, setSalaries] = useState(MOCK_SALARIES);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSalaries = salaries.filter(sal =>
    sal.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sal.divisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sal.periode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gaji-page-wrapper"> 
      
      <header className="page-header">
        <div>
            <h1>Data Gaji Karyawan</h1>
            <p className="page-subtitle">Kelola dan lihat riwayat penggajian karyawan per periode.</p>
        </div>
        <button className="btn-primary">
          + Proses Gaji Baru
        </button>
      </header>

      <div className="gaji-controls">
        <input 
          type="text" 
          placeholder="Cari nama, divisi, atau periode..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        {/* Dropdown filter periode gaji bisa ditambahkan di sini */}
      </div>

      <div className="gaji-table-container dashboard-card">
        <table className="gaji-table">
          <thead>
            <tr>
              <th>Nama Karyawan</th>
              <th>Divisi</th>
              <th>Periode</th>
              <th className="text-right">Gaji Pokok</th>
              <th className="text-right">Tunjangan</th>
              <th className="text-right">Potongan</th>
              <th className="text-right">Gaji Bersih</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.length > 0 ? (
              filteredSalaries.map((sal) => {
                const gajiBersih = sal.gajiPokok + sal.tunjangan - sal.potongan;
                return (
                  <tr key={sal.id}>
                    <td>{sal.nama}</td>
                    <td>{sal.divisi}</td>
                    <td>{sal.periode}</td>
                    <td className="text-right">{formatRupiah(sal.gajiPokok)}</td>
                    <td className="text-right">{formatRupiah(sal.tunjangan)}</td>
                    <td className="text-right text-danger">{formatRupiah(sal.potongan)}</td>
                    <td className="text-right text-success font-bold">{formatRupiah(gajiBersih)}</td>
                    <td>
                      <button className="btn-action view">Detail Slip</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="empty-state">Data penggajian tidak ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Gaji;