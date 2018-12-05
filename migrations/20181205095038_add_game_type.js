
exports.up = function(knex, Promise) {
  return knex.schema.table('scores', (table) => {
    table.string('game_type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('scores', (table) => {
    table.dropColumn('game_type');
  });
};
