import { Router } from "express";

import UserRoutes from "./UserRoutes.js";
import TokenRoutes from "./TokenRoutes.js";
import FileRoutes from "./FileRoutes.js";
import TarefasRoutes from "./TarefaRoutes.js";
import AdminRoutes from "./AdminRoutes.js";
import CategoryRoutes from "./CategoryRoutes.js"; // Importando as rotas de Categoria
// import CategoriaRoutes from "./CatagoriaRoutes.js";

const router = Router();

// Rota de boas-vindas
router.get("/", (req, res) => res.json("Bem Vindo a Api"));

// Definição das rotas
router.use("/users", UserRoutes);
router.use("/token", TokenRoutes);
router.use("/files", FileRoutes);
router.use("/tarefas", TarefasRoutes);
router.use("/admin", AdminRoutes);
router.use("/categorias", CategoryRoutes); // Usando as rotas de Categoria
// router.use("/categorias", CategoriaRoutes);

// Rota para 404
router.use("*", (req, res) => res.status(404).json({ error: "Página Não Encontrada" }));

export default router;
