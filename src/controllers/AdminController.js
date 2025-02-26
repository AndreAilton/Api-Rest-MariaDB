import User from '../models/Admin.js';

class AdminController {
    async store(req, res) {
        try {
            const novoUser = await User.create(req.body);
            return res.status(200).json({success: true, user: novoUser});
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ errors: ['Admin já está cadastrado.'] });
            }
            return res.status(400).json({sucess: false, errors: e.errors.map((err) => err.message)});      
        }
    }
  }

export default new AdminController();
