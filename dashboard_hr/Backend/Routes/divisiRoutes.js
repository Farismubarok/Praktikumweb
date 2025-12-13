import express from 'express';
import { 
  createDivisi, 
  getAllDivisi, 
  getDivisiById, 
  updateDivisi, 
  deleteDivisi 
} from '../Controller/divisiController.js';

const router = express.Router();

router.post('/', createDivisi);
router.get('/', getAllDivisi);
router.get('/:id', getDivisiById);
router.put('/:id', updateDivisi);
router.delete('/:id', deleteDivisi);

export default router;
