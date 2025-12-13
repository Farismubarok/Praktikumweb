import db from '../Config/db.js';
import bcrypt from 'bcryptjs';

// ==================== ADMIN CONTROLLER ====================

// CREATE - Register admin baru
export const createAdmin = async (req, res) => {
  const { nama_lengkap, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const [existing] = await db.query('SELECT id FROM tabel_admin WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO tabel_admin (nama_lengkap, email, password) VALUES (?, ?, ?)`,
      [nama_lengkap, email, hashedPassword]
    );

    res.status(201).json({ 
      message: 'Admin berhasil ditambahkan!', 
      id: result.insertId 
    });
  } catch (error) {
    console.error("Error insert admin:", error);
    res.status(500).json({ message: 'Gagal menambahkan admin', error: error.message });
  }
};

// LOGIN - Login admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM tabel_admin WHERE email = ?', [email]);
    
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email atau password salah!' });
    }

    const admin = rows[0];
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email atau password salah!' });
    }

    // Jangan kirim password ke client
    const { password: _, ...adminData } = admin;

    res.status(200).json({ 
      message: 'Login berhasil!',
      admin: adminData
    });
  } catch (error) {
    console.error("Error login admin:", error);
    res.status(500).json({ message: 'Gagal login', error: error.message });
  }
};

// READ - Ambil semua admin
export const getAllAdmin = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nama_lengkap, email, dibuat_pada FROM tabel_admin ORDER BY id DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error get all admin:", error);
    res.status(500).json({ message: 'Gagal mengambil data admin', error: error.message });
  }
};

// READ - Ambil admin by ID
export const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT id, nama_lengkap, email, dibuat_pada FROM tabel_admin WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error get admin by id:", error);
    res.status(500).json({ message: 'Gagal mengambil data admin', error: error.message });
  }
};

// UPDATE - Update admin
export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { nama_lengkap, email, password } = req.body;

  try {
    let query, params;

    if (password) {
      // Jika password diubah
      const hashedPassword = await bcrypt.hash(password, 10);
      query = 'UPDATE tabel_admin SET nama_lengkap = ?, email = ?, password = ? WHERE id = ?';
      params = [nama_lengkap, email, hashedPassword, id];
    } else {
      // Jika password tidak diubah
      query = 'UPDATE tabel_admin SET nama_lengkap = ?, email = ? WHERE id = ?';
      params = [nama_lengkap, email, id];
    }

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }

    res.status(200).json({ message: 'Data admin berhasil diupdate!' });
  } catch (error) {
    console.error("Error update admin:", error);
    res.status(500).json({ message: 'Gagal update admin', error: error.message });
  }
};

// DELETE - Hapus admin
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM tabel_admin WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }

    res.status(200).json({ message: 'Admin berhasil dihapus!' });
  } catch (error) {
    console.error("Error delete admin:", error);
    res.status(500).json({ message: 'Gagal menghapus admin', error: error.message });
  }
};
