
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(t) {
    t.increments('id');
    t.string('first_name').notNull().defaultTo('');
    t.string('last_name').notNull().defaultTo('');
    t.string('email').notNull().unique();
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  }).then(function() {
    return knex.raw('ALTER TABLE users ADD COLUMN hashed_password CHAR (60);');
  });




};

exports.down = function(knex, Promise) {

};
