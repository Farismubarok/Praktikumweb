// Bagian: Komponen DataKaryawan
import React, { useState, useEffect } from 'react';
import './DataKaryawan.css';
import { fetchKaryawan, fetchDivisi, deleteKaryawan, formatEmployeeId, formatDate } from '../../utils/api';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Bagian: Import Komponen
import Model from '../../Components/model/model';
import TambahKaryawan from '../../Forms/Tambah_Karyawan/TambahKaryawan';
import EditKaryawan from '../../Forms/EditKaryawan/EditKaryawan';
import { toast } from 'sonner';

const DataKaryawan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedKaryawan, setSelectedKaryawan] = useState(null);
  const [karyawanList, setKaryawanList] = useState([]);
  const [divisiList, setDivisiList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Bagian: State Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDivisi, setFilterDivisi] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Bagian: Fetch Data
  const loadKaryawan = async () => {
    setLoading(true);
    const data = await fetchKaryawan();
    setKaryawanList(data);
    setLoading(false);
  };

  const loadDivisi = async () => {
    const data = await fetchDivisi();
    setDivisiList(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([loadKaryawan(), loadDivisi()]);
    };
    fetchData();
  }, []);

  // Bagian: Filter Karyawan
  const filteredKaryawan = karyawanList.filter((emp) => {
    const matchSearch = 
      emp.nama_lengkap?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.jabatan?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDivisi = filterDivisi === '' || emp.id_divisi == filterDivisi;
    const matchStatus = filterStatus === '' || emp.status === filterStatus;
    return matchSearch && matchDivisi && matchStatus;
  });

  // Bagian: Handle Edit
  const handleEdit = (emp) => {
    setSelectedKaryawan(emp);
    setIsEditModalOpen(true);
  };

  // Bagian: Handle Hapus
  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus karyawan ini?')) {
      await deleteKaryawan(id);
      toast.success('Karyawan berhasil dihapus');
      loadKaryawan(); // Bagian: Refresh Data
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
            
            <button className="btn-primary-data-karyawan" onClick={() => setIsModalOpen(true)}>
              + Tambah Karyawan
            </button>
          </div>

          <div className="card">
            {/* ... Bagian Filter dan Dropdown Tetap Sama ... */}
            <div className="filter-section">
              <div className="search-input1">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Cari nama, email, atau jabatan..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="dropdowns">
                <select value={filterDivisi} onChange={(e) => setFilterDivisi(e.target.value)}>
                  <option value="">Semua Divisi</option>
                  {divisiList.map((div) => (
                    <option key={div.id} value={div.id}>{div.nama_divisi}</option>
                  ))}
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">Semua Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
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
                  ) : filteredKaryawan.length === 0 ? (
                    <tr><td colSpan="8" style={{textAlign: 'center'}}>Tidak ada data karyawan</td></tr>
                  ) : (
                    filteredKaryawan.map((emp) => (
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
                          <span className={`status-badge status-disetujui ${emp.status?.toLowerCase().replace(' ', '-')}`}>
                            {emp.status}
                          </span>
                        </td>
                        <td>
                            <button className="btn-action edit" onClick={() => handleEdit(emp)}>Edit</button>
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

        {/* Render Modal Tambah */}
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

        {/* Render Modal Edit */}
        <Model 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          title="Edit Data Karyawan"
        >
          <EditKaryawan 
            karyawan={selectedKaryawan}
            onClose={() => setIsEditModalOpen(false)} 
            onSuccess={loadKaryawan}
          />
        </Model>

      </main>
    </div>
  );
};

export default DataKaryawan;