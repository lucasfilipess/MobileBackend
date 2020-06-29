const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    try {
      const ideas = await connection('ideas')
        .join('users', 'users.id', '=', 'ideas.user_id')
        .select(['ideas.*', 'users.profile_picture', 'users.name'])
        .orderBy('id', 'desc');

      // if (!ideas.length) {
      //   return response.status(404).json({ msg: 'not ideas found' });
      // }
      return response.json(ideas);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async old(request, response) {
    try {
      const ideas = await connection('ideas')
        .join('users', 'users.id', '=', 'ideas.user_id')
        .select(['ideas.*', 'users.profile_picture', 'users.name']);

      // if (!ideas.length) {
      //   return response.status(404).json({ msg: 'not ideas found' });
      // }
      return response.json(ideas);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },
  async deslikes(request, response) {
    try {
      const ideas = await connection('ideas')
        .join('users', 'users.id', '=', 'ideas.user_id')
        .select(['ideas.*', 'users.profile_picture', 'users.name'])
        .orderBy('likes');

      // if (!ideas.length) {
      //   return response.status(404).json({ msg: 'not ideas found' });
      // }
      return response.json(ideas);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },
  async likes(request, response) {
    try {
      const ideas = await connection('ideas')
        .join('users', 'users.id', '=', 'ideas.user_id')
        .select(['ideas.*', 'users.profile_picture', 'users.name'])
        .orderBy('likes', 'desc');

      // if (!ideas.length) {
      //   return response.status(404).json({ msg: 'not ideas found' });
      // }
      return response.json(ideas);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async myIdeas(request, response) {
    try {
      const ideas = await connection('ideas')
        .join('users', 'users.id', '=', 'ideas.user_id')
        .select(['ideas.*', 'users.profile_picture', 'users.name'])
        .where('user_id', request.id);

      // if (!ideas.length) {
      //   return response.status(404).json({ msg: 'not ideas found' });
      // }

      return response.json(ideas);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async create(request, response) {
    try {
      const { title, description, type, references } = request.body;
      const user_id = request.id;
      const likes = 0;
      const idea = await connection('ideas').insert({
        title,
        description,
        type,
        references,
        likes,
        user_id,
      });
      return response.json(idea);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async update(request, response) {
    try {
      const { id, title, description, type, references } = request.body;
      const idea = await connection('ideas')
        .where('id', id)
        .select('user_id')
        .first();
      if (id !== idea.user_id) {
        const ideaUpdated = await connection('ideas').where('id', id).update({
          title,
          description,
          type,
          references,
        });
        return response.json(ideaUpdated);
      } else {
        return response.status(401).json({ error: 'Operation not permitted.' });
      }
    } catch (error) {
      response.json({
        status: 'could not update instance in database',
        error,
      });
    }
  },

  async delete(request, response) {
    try {
      const id = request.params.id;
      const user_id = request.id;

      const idea = await connection('ideas')
        .where('id', id)
        .select('user_id')
        .first();

      if (user_id != idea.user_id) {
        return response.status(401).json({ error: 'Operation not permitted.' });
      } else {
        await connection('ideas').where('id', id).delete();
        return response
          .status(201)
          .json({ status: 'success', message: 'idea deleted' });
      }
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async like(request, response) {
    try {
      const { id } = request.params;

      let { likes } = await connection('ideas')
        .where('id', id)
        .select('likes')
        .first();
      likes = likes + 1;

      await connection('ideas').where('id', id).update({ likes });
      return response.status(201).json({ status: 'success', message: 'liked' });
    } catch (error) {
      console.log(error);

      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async deslike(request, response) {
    try {
      const { id } = request.params;

      let { likes } = await connection('ideas')
        .where('id', id)
        .select('likes')
        .first();
      likes = likes - 1;

      await connection('ideas').where('id', id).update({ likes });
      return response
        .status(201)
        .json({ status: 'success', message: 'desliked' });
    } catch (error) {
      console.log(error);

      return response.status(500).json({ error: 'internal server error' });
    }
  },
};
