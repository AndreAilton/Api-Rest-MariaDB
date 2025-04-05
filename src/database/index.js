import Sequelize from "sequelize";
import databaseConfig from "../config/database.js";
import User from "../models/User.js";
import Files from "../models/Files.js";
import Tarefa from "../models/Tarefas.js";
import Admin from "../models/Admin.js";
import Categoria from "../models/Categoria.js";

const models = [User, Files, Tarefa, Admin, Categoria];
const connection = new Sequelize(databaseConfig);

(async () => {
  try {
    await connection.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:');
  }
})();

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));