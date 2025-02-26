import express from 'express';
import LoginRequire from '../middlewares/TokenRequire.js';
import TarefasController from '../controllers/TarefasController.js';

const router = express.Router();

router.post('/', LoginRequire, TarefasController.store);
router.get('/', LoginRequire, TarefasController.show);
router.put('/:id', LoginRequire, TarefasController.update);
router.delete('/:id', LoginRequire, TarefasController.destroy);

export default router;
