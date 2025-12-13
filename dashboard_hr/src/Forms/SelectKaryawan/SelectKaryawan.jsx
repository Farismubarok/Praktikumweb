// src/Forms/SelectKaryawan/SelectKaryawan.jsx
import React, { useState, useEffect } from 'react';
import './SelectKaryawan.css';
import { fetchKaryawan } from '../../utils/api';

const SelectKaryawan = ({ onSelect, onClose }) => {
  const [karyawanList, setKaryawanList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKaryawan();
  }, []);

  const loadKaryawan = async () => {
    try {
      const data = await fetchKaryawan();
      setKaryawanList(data);
    } catch (error) {
      console.error('Error loading karyawan:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredKaryawan = karyawanList.filter(emp =>
    emp.nama_lengkap?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id?.toString().includes(searchTerm)
  );

  const handleSelectKaryawan = (emp) => {
    onSelect(emp);
  };

  return (
    <div className="select-karyawan-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Cari nama atau ID karyawan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input-karyawan"
          autoFocus
        />
      </div>

      <div className="karyawan-list">
        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : filteredKaryawan.length > 0 ? (
          filteredKaryawan.map((emp) => (
            <button
              key={emp.id}
              className="karyawan-item"
              onClick={() => handleSelectKaryawan(emp)}
            >
              <div className="karyawan-info">
                <h4>{emp.nama_lengkap}</h4>
                <p>{`EMP${String(emp.id).padStart(3, '0')} • ${emp.nama_divisi || emp.jabatan || '-'}`}</p>
              </div>
            </button>
          ))
        ) : (
          <div className="empty-state">Karyawan tidak ditemukan</div>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>
          Batal
        </button>
      </div>
    </div>
  );
};

export default SelectKaryawan;
