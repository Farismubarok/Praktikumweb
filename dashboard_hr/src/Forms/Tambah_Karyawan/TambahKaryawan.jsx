import React from 'react';
import { useAddEmployee } from '../../Logic/tambahKaryawan';
import { UploadCloud } from 'lucide-react'; // Ikon untuk upload
import './TambahKaryawan.css';

const TambahKaryawan = ({ onClose, onSuccess }) => {
  const { step, formData, loading, handleChange, nextStep, prevStep, submitForm } = useAddEmployee(onClose, onSuccess);

  return (
    <div className="wizard-container">
      {/* --- HEADER STEPPER --- */}
      <div className="stepper-header">
        <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
        <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
        <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>
      
      <div className="stepper-labels">
        <span className={step === 1 ? 'active-text' : ''}>Data Diri</span>
        <span className={step === 2 ? 'active-text' : ''}>Jabatan & Divisi</span>
        <span className={step === 3 ? 'active-text' : ''}>Gaji & Benefit</span>
      </div>

      <form onSubmit={step === 3 ? submitForm : (e) => { e.preventDefault(); nextStep(); }}>
        <div className="form-content">
          
          {/* --- STEP 1: DATA DIRI --- */}
          {step === 1 && (
            <div className="form-grid">
              <div className="form-group">
                <label>Nama Lengkap <span className="text-red">*</span></label>
                <input name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} required placeholder="Masukkan nama lengkap" />
              </div>
              <div className="form-group">
                <label>NIK / KTP <span className="text-red">*</span></label>
                <input name="nik" value={formData.nik} onChange={handleChange} required placeholder="16 digit NIK" />
              </div>
              <div className="form-group">
                <label>Tempat Lahir <span className="text-red">*</span></label>
                <input name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} required placeholder="Jakarta" />
              </div>
              <div className="form-group">
                <label>Tanggal Lahir <span className="text-red">*</span></label>
                <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email <span className="text-red">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="nama@company.com" />
              </div>
              <div className="form-group">
                <label>Nomor HP <span className="text-red">*</span></label>
                <input name="no_telepon" value={formData.no_telepon} onChange={handleChange} required placeholder="+62 812-3456-7890" />
              </div>
              
              {/* Upload Foto Area */}
              <div className="form-group full-width">
                <label>Upload Foto Profil</label>
                <div className="upload-box">
                  <div className="upload-placeholder">
                    <div className="upload-icon-circle"><UploadCloud size={24}/></div>
                    <span>Klik untuk upload atau drag & drop</span>
                    <small>Format: JPG, PNG. Maksimal 2MB</small>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- STEP 2: JABATAN & DIVISI --- */}
          {step === 2 && (
            <div className="form-grid">
              <div className="form-group">
                <label>Jabatan <span className="text-red">*</span></label>
                <input name="jabatan" value={formData.jabatan} onChange={handleChange} required placeholder="Senior Developer" />
              </div>
              <div className="form-group">
                <label>Divisi <span className="text-red">*</span></label>
                <select name="id_divisi" value={formData.id_divisi} onChange={handleChange} required>
                  <option value="">Pilih Divisi</option>
                  <option value="1">Engineering</option>
                  <option value="2">Sales</option>
                  <option value="3">Marketing</option>
                  <option value="4">Design</option>
                  <option value="5">Finance</option>
                  <option value="6">HR</option>
                </select>
              </div>
              <div className="form-group">
                <label>Jenis Kepegawaian <span className="text-red">*</span></label>
                <select name="jenis_kepegawaian" value={formData.jenis_kepegawaian} onChange={handleChange} required>
                  <option value="">Pilih Jenis</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tanggal Masuk <span className="text-red">*</span></label>
                <input type="date" name="tanggal_masuk" value={formData.tanggal_masuk} onChange={handleChange} required />
              </div>
              <div className="form-group full-width">
                <label>Status Karyawan <span className="text-red">*</span></label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>
            </div>
          )}

          {/* --- STEP 3: GAJI & BENEFIT --- */}
          {step === 3 && (
            <div className="form-grid">
              <div className="form-group">
                <label>Gaji Pokok <span className="text-red">*</span></label>
                <input type="number" name="gaji_pokok" value={formData.gaji_pokok} onChange={handleChange} required placeholder="Rp 5.000.000" />
              </div>
              <div className="form-group">
                <label>Tunjangan <span className="text-red">*</span></label>
                <input type="number" name="tunjangan" value={formData.tunjangan} onChange={handleChange} placeholder="Rp 1.000.000" />
              </div>
              <div className="form-group">
                <label>Asuransi Kesehatan <span className="text-red">*</span></label>
                <select name="asuransi" value={formData.asuransi} onChange={handleChange}>
                  <option value="">Pilih Asuransi</option>
                  <option value="BPJS">BPJS Kesehatan</option>
                  <option value="Swasta">Asuransi Swasta</option>
                </select>
              </div>
              <div className="form-group">
                <label>Nomor Rekening <span className="text-red">*</span></label>
                <input name="nomor_rekening" value={formData.nomor_rekening} onChange={handleChange} required placeholder="1234567890" />
              </div>
              
              <div className="summary-card full-width">
                <h4>Ringkasan Data Karyawan</h4>
                <div className="summary-grid">
                  <div><small>Nama:</small> <br/> <strong>{formData.nama_lengkap || '-'}</strong></div>
                  <div><small>Email:</small> <br/> <strong>{formData.email || '-'}</strong></div>
                  <div><small>Jabatan:</small> <br/> <strong>{formData.jabatan || '-'}</strong></div>
                  <div><small>Divisi:</small> <br/> <strong>{formData.id_divisi || '-'}</strong></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- FOOTER BUTTONS --- */}
        <div className="form-footer">
          {step === 1 ? (
            <button type="button" onClick={onClose} className="btn-outline">Batal</button>
          ) : (
            <button type="button" onClick={prevStep} className="btn-outline">Kembali</button>
          )}

          {step < 3 ? (
            <button type="submit" className="btn-solid">Lanjut ke Langkah {step + 1}</button>
          ) : (
            <button type="submit" className="btn-success" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan Karyawan'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TambahKaryawan;