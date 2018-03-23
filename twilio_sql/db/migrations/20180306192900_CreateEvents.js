
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('events', table => {
      table.increments('id');
      table.dateTime('date');
      table.boolean('past').defaultTo(false)
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
