import Categoria from '../models/Categoria.js';

class CategoriaController {
  // Cria uma nova categoria
  async store(req, res) {
    try {
      const novaCategoria = await Categoria.create({ ...req.body, user_id: req.userId });
      return res.status(201).json({ success: true, categoria: novaCategoria });
    } catch (e) {
      return res.status(400).json({
        success: false,
        errors: e.errors ? e.errors.map((err) => err.message) : ['Erro ao criar categoria'],
      });
    }
  }

  // Lista todas as categorias do usuário autenticado
  async index(req, res) {
    try {
      const categorias = await Categoria.findAll({
        where: { user_id: req.userId },
        attributes: ['id', 'category', 'created_at', 'updated_at'],
        order: [['id', 'DESC']],
      });

      return res.status(200).json({ success: true, categorias });
    } catch (e) {
      return res.status(500).json({
        success: false,
        errors: ['Erro ao buscar categorias'],
      });
    }
  }

  // Mostra uma categoria específica
  async show(req, res) {
    try {
      const categoria = await Categoria.findOne({
        where: { id: req.params.id, user_id: req.userId },
        attributes: ['id', 'category', 'created_at', 'updated_at'],
      });

      if (!categoria) {
        return res.status(404).json({ success: false, message: 'Categoria não encontrada' });
      }

      return res.status(200).json({ success: true, categoria });
    } catch (e) {
      return res.status(500).json({
        success: false,
        errors: ['Erro ao buscar categoria'],
      });
    }
  }

  // Atualiza uma categoria
  async update(req, res) {
    try {
      const categoria = await Categoria.findOne({
        where: { id: req.params.id, user_id: req.userId },
      });

      if (!categoria) {
        return res.status(404).json({ success: false, message: 'Categoria não encontrada' });
      }

      const categoriaAtualizada = await categoria.update(req.body);
      return res.status(200).json({ success: true, categoria: categoriaAtualizada });
    } catch (e) {
      return res.status(400).json({
        success: false,
        errors: e.errors ? e.errors.map((err) => err.message) : ['Erro ao atualizar categoria'],
      });
    }
  }

  // Deleta uma categoria
  async destroy(req, res) {
    try {
      const categoria = await Categoria.findOne({
        where: { id: req.params.id, user_id: req.userId },
      });

      if (!categoria) {
        return res.status(404).json({ success: false, message: 'Categoria não encontrada' });
      }

      await categoria.destroy();
      return res.status(200).json({ success: true, message: 'Categoria deletada com sucesso' });
    } catch (e) {
      return res.status(500).json({
        success: false,
        errors: ['Erro ao deletar categoria'],
      });
    }
  }
}

export default new CategoriaController();