import express from 'express';
import { createKaryawan } from '../controllers/karyawanController.js';
const router = express.Router();
router.post('/', createKaryawan);
export default router;