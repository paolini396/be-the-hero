const generateUniqueId = require('../utils/generateUniqueId');
const connection = require("../database/connection");

module.exports = {
  //Para listar todas as "ONGS" do banco de dados.
  async index (request, response) {
    const ongs = await connection('ongs').select('*');
  
    return response.json(ongs);
  },

  // criando a "ONG".
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = generateUniqueId();

    await connection('ongs').insert({
      id, 
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return response.json({ id });
  }
}