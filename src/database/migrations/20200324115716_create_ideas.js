exports.up = function (knex) {
  return knex.schema.createTable('ideas', function (table) {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('references');
    table.string('type').notNullable();
    table.integer('likes').notNullable();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('ideas');
};
