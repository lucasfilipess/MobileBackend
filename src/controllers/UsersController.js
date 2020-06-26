const connection = require('../database/connection');
const GenerateToken = require('../utils/GenerateToken');

module.exports = {
  async index(request, response) {
    try {
      const users = await connection('users').select('*');
      return response.json(users);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async getMyData(request, response) {
    try {
      const id = request.id;
      const user = await connection('users')
        .select('*')
        .where('id', id)
        .first();
      return response.json(user);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async create(request, response) {
    try {
      const {
        name,
        email,
        description,
        profile_picture,
        password,
      } = request.body;

      const [user] = await connection('users').insert({
        name,
        email,
        description,
        profile_picture,
        password,
      });
      const token = GenerateToken({
        id: user,
        name: name,
      });

      return response.json({ name, token, profile_picture });
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async update(request, response) {
    try {
      const id = request.id;
      const {
        name,
        email,
        description,
        profile_picture,
        password,
      } = request.body;

      await connection('users').where('id', id).update({
        name,
        email,
        description,
        profile_picture,
        password,
      });

      return response.json({ message: 'success' });
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },
};
