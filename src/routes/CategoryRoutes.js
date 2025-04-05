import { Router } from 'express';
import CategoriaController from '../controllers/CategoriaController.js';
import LoginRequire from '../middlewares/TokenRequire.js'; // Importando o middleware de autenticação

const router = new Router();

// Rota para criar uma nova categoria
router.post('/', LoginRequire, CategoriaController.store);

// Rota para listar todas as categorias
router.get('/', LoginRequire, CategoriaController.index);

// Rota para mostrar uma categoria específica
router.get('/:id', LoginRequire, CategoriaController.show);

// Rota para atualizar uma categoria
router.put('/:id', LoginRequire, CategoriaController.update);

// Rota para deletar uma categoria
router.delete('/:id', LoginRequire, CategoriaController.destroy);

export default router;