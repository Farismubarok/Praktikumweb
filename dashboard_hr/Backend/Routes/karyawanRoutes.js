import express from 'express';
import { 
  createKaryawan, 
  getAllKaryawan, 
  getKaryawanById, 
  updateKaryawan, 
  deleteKaryawan 
} from '../Controller/karyawanController.js';

const router = express.Router();

router.post('/', createKaryawan);
router.get('/', getAllKaryawan);
router.get('/:id', getKaryawanById);
router.put('/:id', updateKaryawan);
router.delete('/:id', deleteKaryawan);

export default router;