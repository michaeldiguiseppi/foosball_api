
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scores', (table) => {
    table.increments();
    table.integer('p1_id').references('id').inTable('users');
    table.integer('p1_score');
    table.integer('p2_id').references('id').inTable('users');
    table.integer('p2_score');
    table.integer('win_by_amount');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scores');
};
