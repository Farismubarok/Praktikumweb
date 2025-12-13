// src/Forms/TambahDivisi/TambahDivisi.jsx
import React, { useState, useEffect } from 'react';
import './TambahDivisi.css';
import { createDivisi, updateDivisi, fetchKaryawan } from '../../utils/api';
import { toast } from 'sonner';

const TambahDivisi = ({ divisiData = null, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nama_divisi: '',
    id_kepala: '',
    anggaran: '',
  });
  
  const [karyawanList, setKaryawanList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadKaryawan();
    if (divisiData) {
      setFormData({
        nama_divisi: divisiData.nama_divisi,
        id_kepala: divisiData.id_kepala || '',
        anggaran: divisiData.anggaran || '',
      });
    }
  }, [divisiData]);

  const loadKaryawan = async () => {
    const data = await fetchKaryawan();
    setKaryawanList(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'anggaran' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nama_divisi.trim()) {
      toast.error('Nama divisi wajib diisi');
      return;
    }

    if (!formData.anggaran || formData.anggaran <= 0) {
      toast.error('Anggaran harus lebih dari 0');
      return;
    }

    setLoading(true);
    try {
      if (divisiData) {
        await updateDivisi(divisiData.id, formData);
        toast.success('Divisi berhasil diperbarui');
      } else {
        await createDivisi(formData);
        toast.success('Divisi berhasil ditambahkan');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Gagal menyimpan divisi');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tambah-divisi-form">
      <div className="form-group">
        <label htmlFor="nama_divisi">Nama Divisi *</label>
        <input
          type="text"
          id="nama_divisi"
          name="nama_divisi"
          value={formData.nama_divisi}
          onChange={handleChange}
          placeholder="Contoh: IT Department"
          required
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="id_kepala">Kepala Divisi</label>
        <select
          id="id_kepala"
          name="id_kepala"
          value={formData.id_kepala}
          onChange={handleChange}
        >
          <option value="">Pilih Kepala Divisi</option>
          {karyawanList.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.nama_lengkap}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="anggaran">Anggaran (Rp) *</label>
        <input
          type="number"
          id="anggaran"
          name="anggaran"
          value={formData.anggaran}
          onChange={handleChange}
          placeholder="Contoh: 50000000"
          required
          min="0"
        />
      </div>

      <div className="form-actions" style={{marginTop: '25px', display:'flex', justifyContent:'flex-end', gap:'10px'}}>
        <button type="button" onClick={onClose} className="btn-secondary" disabled={loading}>
          Batal
        </button>
        <button type="submit" className="btn-primary-data" disabled={loading}>
          {loading ? 'Menyimpan...' : divisiData ? 'Perbarui' : 'Tambah'}
        </button>
      </div>
    </form>
  );
};

export default TambahDivisi;