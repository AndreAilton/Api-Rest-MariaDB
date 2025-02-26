import Tarefa from '../models/Tarefas.js';

class TarefasController {
  async store(req, res) {
    try {
      const novaTarefa = await Tarefa.create({ ...req.body, user_id: req.userId });
      console.log(novaTarefa)
      return res.status(200).json(novaTarefa);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  async show(req, res) {
    try {
      const tarefas = await Tarefa.findAll({
        where: { user_id: req.userId },
        attributes: ['id', 'tittle', 'description', 'done', 'category'],
        order: [['id', 'DESC']],
      });

      return res.status(200).json(tarefas);
    } catch (e) {
      return res.status(400).json({ e });
    }
  }

  async update(req, res) {

    try {
      const tarefa = await Tarefa.findOne({ where: { id: req.params.id, user_id: req.userId } });

      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      await tarefa.update(req.body);
      return res.status(200).json(tarefa);
    } catch (e) {
      return res.status(400).json({ e });
    }
  }

  async destroy(req, res) {
    try {
      const tarefa = await Tarefa.findOne({ where: { id: req.params.id, user_id: req.userId } });

      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      await tarefa.destroy();
      return res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch (e) {
      return res.status(400).json({ e });
    }
  }
}

export default new TarefasController();
