import { Router } from 'express';
import AdminController from '../controllers/AdminController.js';
import UserController from '../controllers/UserController.js';  
import LoginRequire from '../middlewares/TokenRequire.js';

const routes = new Router();

routes.post('/', AdminController.store);
routes.get('/', LoginRequire, UserController.index);

export default routes;
