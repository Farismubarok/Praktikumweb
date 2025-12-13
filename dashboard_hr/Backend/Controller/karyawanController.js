import db from '../Config/db.js';

// ==================== KARYAWAN CONTROLLER ====================

// CREATE - Tambah karyawan baru
export const createKaryawan = async (req, res) => {
  const { nama_lengkap, email, no_telepon, jabatan, id_divisi, status, tanggal_masuk } = req.body;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Insert ke tabel_karyawan (sesuai struktur database)
    const [resKaryawan] = await connection.query(
      `INSERT INTO tabel_karyawan 
      (nama_lengkap, email, no_telepon, jabatan, id_divisi, status, tanggal_masuk) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nama_lengkap, email, no_telepon, jabatan, id_divisi, status || 'Aktif', tanggal_masuk]
    );

    await connection.commit();

    res.status(201).json({ 
      message: 'Data karyawan berhasil disimpan!', 
      id: resKaryawan.insertId 
    });

  } catch (error) {
    await connection.rollback();
    console.error("Error insert karyawan:", error);
    res.status(500).json({ message: 'Gagal menyimpan data', error: error.message });
  } finally {
    connection.release();
  }
};

// READ - Ambil semua karyawan
export const getAllKaryawan = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT k.*, d.nama_divisi 
      FROM tabel_karyawan k
      LEFT JOIN tabel_divisi d ON k.id_divisi = d.id
      ORDER BY k.id DESC
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error get all karyawan:", error);
    res.status(500).json({ message: 'Gagal mengambil data', error: error.message });
  }
};

// READ - Ambil karyawan by ID
export const getKaryawanById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT k.*, d.nama_divisi 
      FROM tabel_karyawan k
      LEFT JOIN tabel_divisi d ON k.id_divisi = d.id
      WHERE k.id = ?
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Karyawan tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error get karyawan by id:", error);
    res.status(500).json({ message: 'Gagal mengambil data', error: error.message });
  }
};

// UPDATE - Update data karyawan
export const updateKaryawan = async (req, res) => {
  const { id } = req.params;
  const { nama_lengkap, email, no_telepon, jabatan, id_divisi, status, tanggal_masuk } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE tabel_karyawan 
       SET nama_lengkap = ?, email = ?, no_telepon = ?, jabatan = ?, id_divisi = ?, status = ?, tanggal_masuk = ?
       WHERE id = ?`,
      [nama_lengkap, email, no_telepon, jabatan, id_divisi, status, tanggal_masuk, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Karyawan tidak ditemukan' });
    }

    res.status(200).json({ message: 'Data karyawan berhasil diupdate!' });
  } catch (error) {
    console.error("Error update karyawan:", error);
    res.status(500).json({ message: 'Gagal update data', error: error.message });
  }
};

// DELETE - Hapus karyawan
export const deleteKaryawan = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM tabel_karyawan WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Karyawan tidak ditemukan' });
    }

    res.status(200).json({ message: 'Karyawan berhasil dihapus!' });
  } catch (error) {
    console.error("Error delete karyawan:", error);
    res.status(500).json({ message: 'Gagal menghapus data', error: error.message });
  }
};