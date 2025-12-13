import db from '../Config/db.js';

export const createKaryawan = async (req, res) => {
  // Ambil semua data dari body request (sesuai form UI)
  const {
    // Data Diri
    nama_lengkap, nik, tempat_lahir, tanggal_lahir, email, no_telepon,
    // Jabatan & Divisi
    jabatan, id_divisi, jenis_kepegawaian, tanggal_masuk, status,
    // Gaji & Benefit
    gaji_pokok, tunjangan, nomor_rekening
  } = req.body;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction(); // Mulai transaksi

    // 1. Insert ke tabel_karyawan
    const [resKaryawan] = await connection.query(
      `INSERT INTO tabel_karyawan 
      (nama_lengkap, nik, tempat_lahir, tanggal_lahir, email, no_telepon, jabatan, id_divisi, jenis_kepegawaian, tanggal_masuk, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nama_lengkap, nik, tempat_lahir, tanggal_lahir, email, no_telepon, jabatan, id_divisi, jenis_kepegawaian, tanggal_masuk, status]
    );

    const newKaryawanId = resKaryawan.insertId;

    // 2. Insert ke tabel_gaji
    // Catatan: 'bonus' & 'status_pembayaran' kita set default dulu
    await connection.query(
      `INSERT INTO tabel_gaji 
      (id_karyawan, gaji_pokok, tunjangan, bonus, status_pembayaran, nomor_rekening) 
      VALUES (?, ?, ?, 0, 'Pending', ?)`,
      [newKaryawanId, gaji_pokok, tunjangan, nomor_rekening]
    );

    await connection.commit(); // Simpan perubahan permanen

    res.status(201).json({ message: 'Data karyawan berhasil disimpan!', id: newKaryawanId });

  } catch (error) {
    await connection.rollback(); // Batalkan jika ada error
    console.error("Error insert karyawan:", error);
    res.status(500).json({ message: 'Gagal menyimpan data', error: error.message });
  } finally {
    connection.release();
  }
};