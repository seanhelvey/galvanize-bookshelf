
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('books', function(t) {
    t.increments('id');
    t.string('title').notNull().defaultTo('');
    t.string('author').notNull().defaultTo('');
    t.string('genre').notNull().defaultTo('');
    t.text('description').notNull().defaultTo("");
    t.text('cover_url').notNull().defaultTo("");
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  //return knex.schema.dropTable('books');
};
