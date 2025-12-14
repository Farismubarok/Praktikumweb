import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Bagian: Import Routes
import karyawanRoutes from './Routes/karyawanRoutes.js';
import gajiRoutes from './Routes/gajiRoutes.js';
import divisiRoutes from './Routes/divisiRoutes.js';
import cutiRoutes from './Routes/cutiRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';

// Bagian: Import Utils
import { syncCutiStatus } from './Utils/syncCutiStatus.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Bagian: Middleware JSON

// Bagian: Sync Cuti Start
syncCutiStatus();

// Bagian: Sync Interval
setInterval(syncCutiStatus, 60 * 1000);

// Bagian: API Routes
app.use('/api/karyawan', karyawanRoutes);
app.use('/api/gaji', gajiRoutes);
app.use('/api/divisi', divisiRoutes);
app.use('/api/cuti', cutiRoutes);
app.use('/api/admin', adminRoutes);

// Bagian: Root Endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'HR Dashboard API',
    endpoints: {
      karyawan: '/api/karyawan',
      gaji: '/api/gaji',
      divisi: '/api/divisi',
      cuti: '/api/cuti',
      admin: '/api/admin'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));