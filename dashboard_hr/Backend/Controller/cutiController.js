import db from '../Config/db.js';

// ==================== CUTI CONTROLLER ====================

// CREATE - Ajukan cuti baru
export const createCuti = async (req, res) => {
  const { id_karyawan, jenis_cuti, tanggal_mulai, tanggal_selesai, durasi, alasan } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO tabel_cuti 
      (id_karyawan, jenis_cuti, tanggal_mulai, tanggal_selesai, durasi, alasan, status) 
      VALUES (?, ?, ?, ?, ?, ?, 'Menunggu')`,
      [id_karyawan, jenis_cuti, tanggal_mulai, tanggal_selesai, durasi, alasan]
    );

    res.status(201).json({ 
      message: 'Pengajuan cuti berhasil!', 
      id: result.insertId 
    });
  } catch (error) {
    console.error("Error insert cuti:", error);
    res.status(500).json({ message: 'Gagal mengajukan cuti', error: error.message });
  }
};

// READ - Ambil semua data cuti
export const getAllCuti = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, k.nama_lengkap, k.jabatan
      FROM tabel_cuti c
      LEFT JOIN tabel_karyawan k ON c.id_karyawan = k.id
      ORDER BY c.tanggal_pengajuan DESC
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error get all cuti:", error);
    res.status(500).json({ message: 'Gagal mengambil data cuti', error: error.message });
  }
};

// READ - Ambil cuti by ID
export const getCutiById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT c.*, k.nama_lengkap, k.jabatan
      FROM tabel_cuti c
      LEFT JOIN tabel_karyawan k ON c.id_karyawan = k.id
      WHERE c.id = ?
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Data cuti tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error get cuti by id:", error);
    res.status(500).json({ message: 'Gagal mengambil data cuti', error: error.message });
  }
};

// READ - Ambil cuti by karyawan ID
export const getCutiByKaryawanId = async (req, res) => {
  const { id_karyawan } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT c.*, k.nama_lengkap, k.jabatan
      FROM tabel_cuti c
      LEFT JOIN tabel_karyawan k ON c.id_karyawan = k.id
      WHERE c.id_karyawan = ?
      ORDER BY c.tanggal_pengajuan DESC
    `, [id_karyawan]);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error get cuti by karyawan id:", error);
    res.status(500).json({ message: 'Gagal mengambil data cuti', error: error.message });
  }
};

// UPDATE - Update data cuti
export const updateCuti = async (req, res) => {
  const { id } = req.params;
  const { jenis_cuti, tanggal_mulai, tanggal_selesai, durasi, alasan, status } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE tabel_cuti 
       SET jenis_cuti = ?, tanggal_mulai = ?, tanggal_selesai = ?, durasi = ?, alasan = ?, status = ?
       WHERE id = ?`,
      [jenis_cuti, tanggal_mulai, tanggal_selesai, durasi, alasan, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data cuti tidak ditemukan' });
    }

    res.status(200).json({ message: 'Data cuti berhasil diupdate!' });
  } catch (error) {
    console.error("Error update cuti:", error);
    res.status(500).json({ message: 'Gagal update data cuti', error: error.message });
  }
};

// UPDATE - Approve/Reject cuti (update status saja)
export const updateStatusCuti = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'Disetujui', 'Menunggu', 'Ditolak'

  try {
    const [result] = await db.query(
      `UPDATE tabel_cuti SET status = ? WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data cuti tidak ditemukan' });
    }

    res.status(200).json({ message: `Status cuti berhasil diubah ke ${status}!` });
  } catch (error) {
    console.error("Error update status cuti:", error);
    res.status(500).json({ message: 'Gagal update status cuti', error: error.message });
  }
};

// DELETE - Hapus data cuti
export const deleteCuti = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM tabel_cuti WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data cuti tidak ditemukan' });
    }

    res.status(200).json({ message: 'Data cuti berhasil dihapus!' });
  } catch (error) {
    console.error("Error delete cuti:", error);
    res.status(500).json({ message: 'Gagal menghapus data cuti', error: error.message });
  }
};
