import User from '../models/User.js';
import File from '../models/Files.js';
import Tarefas from '../models/Tarefas.js'; // Importando o model de Tarefas
import Categoria from '../models/Categoria.js'; // Importando o model de Categoria

class UserController {
    async store(req, res) {
        try {
            const novoUser = await User.create(req.body);
            return res.status(200).json({success: true, user: novoUser});
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ errors: ['Este e-mail já está cadastrado.'] });
            }
            return res.status(400).json({sucess: false, errors: e.errors.map((err) => err.message)});      
        }
    }

    async index(req, res) {

        if (!req.isAdmin){
            return res.status(403).json({ errors: ['Acesso negado. Apenas administradores podem acessar.'] });
        }

        try {
            const users = await User.findAll({
                attributes: ['id', 'name', 'email','status'],
                include: [
                    { model: File },  // Incluindo files do usuário
                    { model: Tarefas },
                    { model: Categoria }
                ],
                order: [['id', 'DESC'], [File, 'id', 'DESC'], [Tarefas, 'id', 'DESC'], [Categoria, 'id', 'DESC']]
            });

            return res.status(200).json(users);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    async show(req, res) {
        if (req.isAdmin){
           if (!req.params.id) {
                return res.status(400).json({sucess: false, message: "Nenhum ID foi fornecido"});
            }
            try {
                const user = await User.findByPk(req.params.id, {
                    attributes: ['id', 'name', 'email','status'],
                    include: [
                        { model: File },  // Incluindo files do usuário
                        { model: Tarefas },// Incluindo as Tarefas do usuário
                        { model: Categoria }
                    ],
                    order: [['id', 'DESC'], [File, 'id', 'DESC'], [Tarefas, 'id', 'DESC'], [Categoria, 'id', 'DESC']],
                });

                if (user.files) {
                    user.files = user.files.filter(file => file.category !== 'Backup');
                }
                
                return res.status(200).json({sucess: true, user});
            } catch (e) {
                return res.status(400).json({sucess: false, message:"usuario nao encontrado"});}
        }
        else 
        {
            try {
            const user = await User.findByPk(req.userId, {
                attributes: ['id', 'name', 'email','status'],
                include: [
                    { model: File },  // Incluindo files do usuário
                    { model: Tarefas },
                    { model: Categoria }
                ],
                order: [['id', 'DESC'], [File, 'id', 'DESC'], [Tarefas, 'id', 'DESC'], [Categoria, 'id', 'DESC']],
            });
            if (user.status === false){
                 return res.status(400).json({sucess: false, message:"usuario desativado"});
            }

            if (user.files) {
                user.files = user.files.filter(file => file.category !== 'Backup');
            }
            
            delete user.dataValues.status
            return res.status(200).json({sucess: true, user});
        } catch (e) {
            return res.status(400).json({sucess: false, message:"usuario nao encontrado"});}
    }
        }
        

    async update(req, res) {
        try {
            const user = await User.findByPk(req.userId);
            await user.update(req.body);
            const { id, name, email } = user;
            return res.status(200).json({ id, name, email });
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    async destroy(req, res) {
        try {
            const user = await User.findByPk(req.userId);
            user.status = false;
            await user.save();
            return res.status(200).json({sucess: true, message:"usuario desativado"});
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}

export default new UserController();
