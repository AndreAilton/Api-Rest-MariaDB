import { Router } from 'express';
import Token from '../controllers/TokenController.js';
import TokenAdmin from '../controllers/TokenAdminController.js';
const router = new Router();

router.post('/', Token.store);
router.post('/admin', TokenAdmin.store);


export default router;