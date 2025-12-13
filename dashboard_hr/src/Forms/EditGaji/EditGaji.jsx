// src/Forms/EditGaji/EditGaji.jsx
import React, { useState, useEffect } from 'react';
import './EditGaji.css';
import { updateGaji, createGaji } from '../../utils/api';
import { toast } from 'sonner';

const EditGaji = ({ selectedKaryawan, gajiData, onClose, onSuccess, onChangeKaryawan }) => {
  const [formData, setFormData] = useState({
    gaji_pokok: '',
    tunjangan: '',
    bonus: '',
    periode: '',
    status_pembayaran: 'Pending',
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set current month as default periode
    const now = new Date();
    const monthYear = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    
    if (gajiData) {
      // Jika edit existing gaji
      setFormData({
        gaji_pokok: gajiData.gaji_pokok || '',
        tunjangan: gajiData.tunjangan || '',
        bonus: gajiData.bonus || '',
        periode: gajiData.periode || monthYear,
        status_pembayaran: gajiData.status_pembayaran || 'Pending',
      });
    } else {
      // Jika tambah gaji baru
      setFormData(prev => ({
        ...prev,
        periode: monthYear,
      }));
    }
  }, [gajiData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['gaji_pokok', 'tunjangan', 'bonus'].includes(name) 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedKaryawan?.id) {
      toast.error('Pilih karyawan terlebih dahulu');
      return;
    }

    if (formData.gaji_pokok < 0 || formData.tunjangan < 0 || formData.bonus < 0) {
      toast.error('Nilai gaji tidak boleh negatif');
      return;
    }

    setLoading(true);
    try {
      // Hanya kirim field yang ada di database
      const dataToSend = {
        id_karyawan: selectedKaryawan.id,
        gaji_pokok: formData.gaji_pokok || 0,
        tunjangan: formData.tunjangan || 0,
        bonus: formData.bonus || 0,
        status_pembayaran: formData.status_pembayaran,
        tanggal_pembayaran: formData.status_pembayaran === 'Dibayar' ? new Date().toISOString().split('T')[0] : null,
      };

      if (gajiData && gajiData.id) {
        // Update existing
        await updateGaji(gajiData.id, dataToSend);
        toast.success('Data gaji berhasil diperbarui');
      } else {
        // Create new
        await createGaji(dataToSend);
        toast.success('Data gaji berhasil disimpan');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Gagal menyimpan data gaji');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const total = (formData.gaji_pokok || 0) + (formData.tunjangan || 0) + (formData.bonus || 0);

  return (
    <form onSubmit={handleSubmit} className="edit-gaji-form">
      {/* Selected Karyawan */}
      <div className="selected-karyawan">
        <div className="karyawan-display">
          <div className="karyawan-name-section">
            <h4>{selectedKaryawan?.nama_lengkap}</h4>
            <p>{`EMP${String(selectedKaryawan?.id).padStart(3, '0')} • ${selectedKaryawan?.nama_divisi || '-'}`}</p>
          </div>
        </div>
        <button 
          type="button" 
          className="btn-ganti" 
          onClick={onChangeKaryawan}
        >
          Ganti
        </button>
      </div>

      {/* Gaji Inputs */}
      <div className="form-row-2col">
        <div className="form-group">
          <label htmlFor="gaji_pokok">Gaji Pokok *</label>
          <input
            type="number"
            id="gaji_pokok"
            name="gaji_pokok"
            value={formData.gaji_pokok}
            onChange={handleChange}
            placeholder="Rp 0"
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tunjangan">Tunjangan *</label>
          <input
            type="number"
            id="tunjangan"
            name="tunjangan"
            value={formData.tunjangan}
            onChange={handleChange}
            placeholder="Rp 0"
            required
            min="0"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="bonus">Bonus</label>
        <input
          type="number"
          id="bonus"
          name="bonus"
          value={formData.bonus}
          onChange={handleChange}
          placeholder="Rp 0"
          min="0"
        />
      </div>

      {/* Periode & Status */}
      <div className="form-row-2col">
        <div className="form-group">
          <label htmlFor="periode">Periode *</label>
          <input
            type="text"
            id="periode"
            name="periode"
            value={formData.periode}
            onChange={handleChange}
            required
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="status_pembayaran">Status *</label>
          <select
            id="status_pembayaran"
            name="status_pembayaran"
            value={formData.status_pembayaran}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Proses">Proses</option>
            <option value="Dibayar">Dibayar</option>
          </select>
        </div>
      </div>

      {/* Total Display */}
      <div className="total-display-new">
        <div className="total-main">
          <div className="total-icon">💰</div>
          <div className="total-info">
            <span className="total-label">Total Gaji</span>
            <span className="total-value">{new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(total)}</span>
          </div>
        </div>

        <div className="breakdown-row">
          <div className="breakdown-item">
            <span className="breakdown-label">Gaji Pokok:</span>
            <span className="breakdown-value">{new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(formData.gaji_pokok || 0)}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Tunjangan:</span>
            <span className="breakdown-value">{new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(formData.tunjangan || 0)}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Bonus:</span>
            <span className="breakdown-value">+{new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(formData.bonus || 0)}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Potongan:</span>
            <span className="breakdown-value negative">-{new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(formData.potongan || 0)}</span>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
          Batal
        </button>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Menyimpan...' : gajiData?.id ? 'Simpan Perubahan' : 'Simpan Data Gaji'}
        </button>
      </div>
    </form>
  );
};

export default EditGaji;
