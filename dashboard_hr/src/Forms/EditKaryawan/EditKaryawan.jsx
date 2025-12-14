import React, { useState, useEffect } from 'react';
import { fetchDivisi, updateKaryawan } from '../../utils/api';
import { toast } from 'sonner';
import './EditKaryawan.css';

const EditKaryawan = ({ karyawan, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    email: '',
    no_telepon: '',
    jabatan: '',
    id_divisi: '',
    status: '',
    tanggal_masuk: '',
  });
  const [divisiList, setDivisiList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Bagian: Load Divisi
    const loadDivisi = async () => {
      const data = await fetchDivisi();
      setDivisiList(data);
    };
    loadDivisi();

    // Bagian: Set Form Data
    if (karyawan) {
      setFormData({
        nama_lengkap: karyawan.nama_lengkap || '',
        email: karyawan.email || '',
        no_telepon: karyawan.no_telepon || '',
        jabatan: karyawan.jabatan || '',
        id_divisi: karyawan.id_divisi || '',
        status: karyawan.status || 'Aktif',
        tanggal_masuk: karyawan.tanggal_masuk ? karyawan.tanggal_masuk.split('T')[0] : '',
      });
    }
  }, [karyawan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateKaryawan(karyawan.id, formData);
      toast.success('Data karyawan berhasil diupdate!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Gagal mengupdate data karyawan');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-karyawan-form">
      <div className="form-grid">
        <div className="form-group">
          <label>Nama Lengkap <span className="text-red">*</span></label>
          <input
            type="text"
            name="nama_lengkap"
            value={formData.nama_lengkap}
            onChange={handleChange}
            required
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div className="form-group">
          <label>Email <span className="text-red">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="nama@company.com"
          />
        </div>

        <div className="form-group">
          <label>No. Telepon <span className="text-red">*</span></label>
          <input
            type="text"
            name="no_telepon"
            value={formData.no_telepon}
            onChange={handleChange}
            required
            placeholder="0812-3456-7890"
          />
        </div>

        <div className="form-group">
          <label>Jabatan <span className="text-red">*</span></label>
          <input
            type="text"
            name="jabatan"
            value={formData.jabatan}
            onChange={handleChange}
            required
            placeholder="Senior Staff"
          />
        </div>

        <div className="form-group">
          <label>Divisi <span className="text-red">*</span></label>
          <select
            name="id_divisi"
            value={formData.id_divisi}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Divisi</option>
            {divisiList.map((div) => (
              <option key={div.id} value={div.id}>{div.nama_divisi}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Status <span className="text-red">*</span></label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Aktif">Aktif</option>
            <option value="Cuti">Cuti</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tanggal Masuk <span className="text-red">*</span></label>
          <input
            type="date"
            name="tanggal_masuk"
            value={formData.tanggal_masuk}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-footer">
        <button type="button" onClick={onClose} className="btn-outline">
          Batal
        </button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
};

export default EditKaryawan;
