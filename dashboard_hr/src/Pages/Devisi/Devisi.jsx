// src/Pages/Devisi/Devisi.jsx

import React, { useState, useEffect } from 'react';
import './Devisi.css'; 
import { fetchDivisi, deleteDivisi, formatDivisiId, formatRupiah } from '../../utils/api';
import { toast } from 'sonner';
import Model from '../../Components/model/model';
import TambahDivisi from '../../Forms/TambahDivisi/TambahDivisi';

const Devisi = () => {
  const [divisions, setDivisions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDivisi, setEditingDivisi] = useState(null);

  // Fetch data divisi
  const loadDivisi = async () => {
    setLoading(true);
    try {
      const data = await fetchDivisi();
      setDivisions(data);
    } catch (error) {
      toast.error('Gagal memuat data divisi');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDivisi();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModalAdd = () => {
    setEditingDivisi(null);
    setIsModalOpen(true);
  };

  const handleOpenModalEdit = (divisi) => {
    setEditingDivisi(divisi);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus divisi ini?')) {
      try {
        await deleteDivisi(id);
        toast.success('Divisi berhasil dihapus');
        loadDivisi();
      } catch (error) {
        toast.error('Gagal menghapus divisi');
        console.error(error);
      }
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
        <button className="btn-primary-divisi" onClick={handleOpenModalAdd}>
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
              <th>Deskripsi</th>
              <th>Kepala Divisi</th>
              <th>Anggaran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="empty-state">Loading...</td>
              </tr>
            ) : filteredDivisions.length > 0 ? (
              filteredDivisions.map((div) => (
                <tr key={div.id}>
                  <td>{formatDivisiId(div.id)}</td>
                  <td>{div.nama_divisi}</td>
                  <td>{div.deskripsi || '-'}</td>
                  <td>{div.nama_kepala || '-'}</td>
                  <td>{formatRupiah(div.anggaran)}</td>
                  <td>
                    <button 
                      className="btn-action edit" 
                      onClick={() => handleOpenModalEdit(div)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-action delete" 
                      onClick={() => handleDelete(div.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">Data divisi tidak ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Model 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingDivisi(null);
        }} 
        title={editingDivisi ? 'Edit Divisi' : 'Tambah Divisi Baru'}
      >
        <TambahDivisi 
          divisiData={editingDivisi}
          onClose={() => {
            setIsModalOpen(false);
            setEditingDivisi(null);
          }} 
          onSuccess={loadDivisi}
        />
      </Model>
      
    </div>
  );
};

export default Devisi;