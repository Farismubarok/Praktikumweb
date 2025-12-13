import db from '../Config/db.js';

// ==================== DIVISI CONTROLLER ====================

// CREATE - Tambah divisi baru
export const createDivisi = async (req, res) => {
  const { nama_divisi, deskripsi, anggaran, id_kepala_divisi } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO tabel_divisi 
      (nama_divisi, deskripsi, anggaran, id_kepala_divisi) 
      VALUES (?, ?, ?, ?)`,
      [nama_divisi, deskripsi, anggaran, id_kepala_divisi]
    );

    const newDivisiId = result.insertId;

    // Auto-update karyawan's id_divisi jika jadi kepala divisi
    if (id_kepala_divisi) {
      await db.query(
        `UPDATE tabel_karyawan SET id_divisi = ? WHERE id = ?`,
        [newDivisiId, id_kepala_divisi]
      );
    }

    res.status(201).json({ 
      message: 'Divisi berhasil ditambahkan!', 
      id: newDivisiId 
    });
  } catch (error) {
    console.error("Error insert divisi:", error);
    res.status(500).json({ message: 'Gagal menyimpan divisi', error: error.message });
  }
};

// READ - Ambil semua divisi
export const getAllDivisi = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT d.*, k.nama_lengkap as nama_kepala
      FROM tabel_divisi d
      LEFT JOIN tabel_karyawan k ON d.id_kepala_divisi = k.id
      ORDER BY d.id DESC
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error get all divisi:", error);
    res.status(500).json({ message: 'Gagal mengambil data divisi', error: error.message });
  }
};

// READ - Ambil divisi by ID
export const getDivisiById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT d.*, k.nama_lengkap as nama_kepala
      FROM tabel_divisi d
      LEFT JOIN tabel_karyawan k ON d.id_kepala_divisi = k.id
      WHERE d.id = ?
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Divisi tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error get divisi by id:", error);
    res.status(500).json({ message: 'Gagal mengambil data divisi', error: error.message });
  }
};

// UPDATE - Update divisi
export const updateDivisi = async (req, res) => {
  const { id } = req.params;
  const { nama_divisi, deskripsi, anggaran, id_kepala_divisi } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE tabel_divisi 
       SET nama_divisi = ?, deskripsi = ?, anggaran = ?, id_kepala_divisi = ?
       WHERE id = ?`,
      [nama_divisi, deskripsi, anggaran, id_kepala_divisi, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Divisi tidak ditemukan' });
    }

    // Auto-update karyawan's id_divisi jika jadi kepala divisi
    if (id_kepala_divisi) {
      await db.query(
        `UPDATE tabel_karyawan SET id_divisi = ? WHERE id = ?`,
        [id, id_kepala_divisi]
      );
    }

    res.status(200).json({ message: 'Divisi berhasil diupdate!' });
  } catch (error) {
    console.error("Error update divisi:", error);
    res.status(500).json({ message: 'Gagal update divisi', error: error.message });
  }
};

// DELETE - Hapus divisi
export const deleteDivisi = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM tabel_divisi WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Divisi tidak ditemukan' });
    }

    res.status(200).json({ message: 'Divisi berhasil dihapus!' });
  } catch (error) {
    console.error("Error delete divisi:", error);
    res.status(500).json({ message: 'Gagal menghapus divisi', error: error.message });
  }
};
