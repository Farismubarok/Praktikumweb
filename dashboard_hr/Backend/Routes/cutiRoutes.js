import express from 'express';
import { 
  createCuti, 
  getAllCuti, 
  getCutiById, 
  getCutiByKaryawanId,
  updateCuti, 
  updateStatusCuti,
  deleteCuti 
} from '../Controller/cutiController.js';

const router = express.Router();

router.post('/', createCuti);
router.get('/', getAllCuti);
router.get('/:id', getCutiById);
router.get('/karyawan/:id_karyawan', getCutiByKaryawanId);
router.put('/:id', updateCuti);
router.patch('/:id/status', updateStatusCuti);
router.delete('/:id', deleteCuti);

export default router;
