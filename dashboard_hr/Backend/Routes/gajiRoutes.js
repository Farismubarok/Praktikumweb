import express from 'express';
import { 
  createGaji, 
  getAllGaji, 
  getGajiById, 
  getGajiByKaryawanId,
  updateGaji, 
  deleteGaji 
} from '../Controller/gajiController.js';

const router = express.Router();

router.post('/', createGaji);
router.get('/', getAllGaji);
router.get('/:id', getGajiById);
router.get('/karyawan/:id_karyawan', getGajiByKaryawanId);
router.put('/:id', updateGaji);
router.delete('/:id', deleteGaji);

export default router;
