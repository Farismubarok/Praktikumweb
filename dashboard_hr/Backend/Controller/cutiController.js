import db from '../Config/db.js';

// Bagian: Controller Cuti

// Bagian: Create Cuti
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

// Bagian: Get Semua Cuti
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

// Bagian: Get Cuti by ID
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

// Bagian: Get Cuti by Karyawan ID
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

// Bagian: Update Cuti
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

// Bagian: Update Status Cuti
export const updateStatusCuti = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'Disetujui', 'Menunggu', 'Ditolak'

  try {
    // Bagian: Ambil Data Cuti
    const [cutiRows] = await db.query(`SELECT id_karyawan FROM tabel_cuti WHERE id = ?`, [id]);
    
    if (cutiRows.length === 0) {
      return res.status(404).json({ message: 'Data cuti tidak ditemukan' });
    }

    const id_karyawan = cutiRows[0].id_karyawan;

    // Bagian: Update Status Cuti DB
    await db.query(
      `UPDATE tabel_cuti SET status = ? WHERE id = ?`,
      [status, id]
    );

    // Bagian: Jika Ditolak
    if (status === 'Ditolak') {
      await db.query(
        `UPDATE tabel_karyawan SET status = 'Aktif' WHERE id = ? AND status = 'Cuti'`,
        [id_karyawan]
      );
    }
    
    // Bagian: Catatan Sync
    // berdasarkan tanggal_mulai dan tanggal_selesai

    res.status(200).json({ message: `Status cuti berhasil diubah ke ${status}!` });
  } catch (error) {
    console.error("Error update status cuti:", error);
    res.status(500).json({ message: 'Gagal update status cuti', error: error.message });
  }
};

// Bagian: Delete Cuti
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
