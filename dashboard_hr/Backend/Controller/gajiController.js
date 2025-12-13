import db from '../Config/db.js';

// ==================== GAJI CONTROLLER ====================

// CREATE - Tambah data gaji
export const createGaji = async (req, res) => {
  const { id_karyawan, gaji_pokok, tunjangan, bonus, status_pembayaran, tanggal_pembayaran } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO tabel_gaji 
      (id_karyawan, gaji_pokok, tunjangan, bonus, status_pembayaran, tanggal_pembayaran) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [id_karyawan, gaji_pokok, tunjangan, bonus || 0, status_pembayaran || 'Pending', tanggal_pembayaran]
    );

    res.status(201).json({ 
      message: 'Data gaji berhasil disimpan!', 
      id: result.insertId 
    });
  } catch (error) {
    console.error("Error insert gaji:", error);
    res.status(500).json({ message: 'Gagal menyimpan data gaji', error: error.message });
  }
};

// READ - Ambil semua data gaji
export const getAllGaji = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT g.*, k.nama_lengkap, k.jabatan, d.nama_divisi
      FROM tabel_gaji g
      LEFT JOIN tabel_karyawan k ON g.id_karyawan = k.id
      LEFT JOIN tabel_divisi d ON k.id_divisi = d.id
      ORDER BY g.id DESC
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error get all gaji:", error);
    res.status(500).json({ message: 'Gagal mengambil data gaji', error: error.message });
  }
};

// READ - Ambil gaji by ID
export const getGajiById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT g.*, k.nama_lengkap, k.jabatan
      FROM tabel_gaji g
      LEFT JOIN tabel_karyawan k ON g.id_karyawan = k.id
      WHERE g.id = ?
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Data gaji tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error get gaji by id:", error);
    res.status(500).json({ message: 'Gagal mengambil data gaji', error: error.message });
  }
};

// READ - Ambil gaji by karyawan ID
export const getGajiByKaryawanId = async (req, res) => {
  const { id_karyawan } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT g.*, k.nama_lengkap, k.jabatan, d.nama_divisi
      FROM tabel_gaji g
      LEFT JOIN tabel_karyawan k ON g.id_karyawan = k.id
      LEFT JOIN tabel_divisi d ON k.id_divisi = d.id
      WHERE g.id_karyawan = ?
      ORDER BY g.id DESC
    `, [id_karyawan]);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error get gaji by karyawan id:", error);
    res.status(500).json({ message: 'Gagal mengambil data gaji', error: error.message });
  }
};

// UPDATE - Update data gaji
export const updateGaji = async (req, res) => {
  const { id } = req.params;
  const { id_karyawan, gaji_pokok, tunjangan, bonus, status_pembayaran, tanggal_pembayaran } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE tabel_gaji 
       SET id_karyawan = ?, gaji_pokok = ?, tunjangan = ?, bonus = ?, status_pembayaran = ?, tanggal_pembayaran = ?
       WHERE id = ?`,
      [id_karyawan, gaji_pokok, tunjangan, bonus, status_pembayaran, tanggal_pembayaran, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data gaji tidak ditemukan' });
    }

    res.status(200).json({ message: 'Data gaji berhasil diupdate!' });
  } catch (error) {
    console.error("Error update gaji:", error);
    res.status(500).json({ message: 'Gagal update data gaji', error: error.message });
  }
};

// DELETE - Hapus data gaji
export const deleteGaji = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM tabel_gaji WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data gaji tidak ditemukan' });
    }

    res.status(200).json({ message: 'Data gaji berhasil dihapus!' });
  } catch (error) {
    console.error("Error delete gaji:", error);
    res.status(500).json({ message: 'Gagal menghapus data gaji', error: error.message });
  }
};
