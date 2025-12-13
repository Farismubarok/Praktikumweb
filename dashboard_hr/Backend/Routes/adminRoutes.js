import express from 'express';
import { 
  createAdmin, 
  loginAdmin,
  getAllAdmin, 
  getAdminById, 
  updateAdmin, 
  deleteAdmin 
} from '../Controller/adminController.js';

const router = express.Router();

router.post('/register', createAdmin);
router.post('/login', loginAdmin);
router.get('/', getAllAdmin);
router.get('/:id', getAdminById);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;
