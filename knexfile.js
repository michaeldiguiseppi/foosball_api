module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/game_tracker_v1'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
  }
}
