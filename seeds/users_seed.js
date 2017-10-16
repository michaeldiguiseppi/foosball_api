
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first_name: 'Mike', last_name: 'DiGuiseppi', is_admin: true},
        {id: 2, first_name: 'Alan', last_name: 'Tweedie', is_admin: true}
      ]);
    });
};
