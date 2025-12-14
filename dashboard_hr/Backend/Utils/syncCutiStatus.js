import db from '../Config/db.js';

// Bagian: Sync Cuti Status
export const syncCutiStatus = async () => {
  try {
    // Bagian: Set Status Cuti
    await db.query(`
      UPDATE tabel_karyawan k
      INNER JOIN tabel_cuti c ON k.id = c.id_karyawan
      SET k.status = 'Cuti'
      WHERE c.status = 'Disetujui'
        AND DATE(c.tanggal_mulai) <= CURDATE()
        AND DATE(c.tanggal_selesai) >= CURDATE()
    `);

    // Bagian: Set Status Aktif
    await db.query(`
      UPDATE tabel_karyawan k
      SET k.status = 'Aktif'
      WHERE k.status = 'Cuti'
        AND NOT EXISTS (
          SELECT 1 FROM tabel_cuti c
          WHERE c.id_karyawan = k.id
            AND c.status = 'Disetujui'
            AND DATE(c.tanggal_mulai) <= CURDATE()
            AND DATE(c.tanggal_selesai) >= CURDATE()
        )
    `);

    console.log('✅ Cuti status synced');
  } catch (error) {
    console.error('❌ Error syncing cuti status:', error);
  }
};
