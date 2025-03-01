import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js'

export default async (req, res, next) => {
    const {authorization} = req.headers;

    // if (!authorization) {
    //     return res.status(401).json({
    //         errors: ['Login Requerido']
    //     })
    // }
    const [ text, token] = authorization.split(' ');

    try {
            const dados = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET); // Usando a chave secreta do admin
            const { id, email, role } = dados;

            if (role !== 'admin') {
                return res.status(403).json({ errors: ['Acesso negado. Apenas administradores podem acessar.'] });
            }

            const admin = await Admin.findOne({ where: { id, email } });

            if (!admin) {
                return res.status(401).json({ errors: ['Administrador inválido'] });
            }

            req.adminId = id;
            req.adminEmail = email;
            req.isAdmin = true
            return next();
        } catch (e) {
            try {
                const dados = jwt.verify(token, process.env.TOKEN_SECRET)
                const {id, email} = dados
        
                const user = await User.findOne({
                    where: {id,
                        email
                    }
                })

                if (user.status === false) {
                    return res.status(401).json({ message: 'Usuário desativado. Faça login novamente.' });
                }

                if (!user) {
                    return res.status(401).json({
                        errors: ['Usuario Invalido']
                    })
                }
                req.userId = id;
                req.useremail = email;
                req.isAdmin = false
                return next();
            } catch(e) {
                return res.status(401).json({sucess: false,
                    errors: ['Token expirado ou invalido']
                })
            }
 
        }
}