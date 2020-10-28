// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/auth.db3'
    }
  },
  migrations: {
    directory: "./database/migrations",
  }, 
  seeds: {
		directory: "./database/seeds",
  },
  //!!Still don't get this
	pool: {
		afterCreate: (conn, done) => {
			conn.run("PRAGMA foreign_keys = ON", done)
		},
	},

};

//Remember: knex migrate:make make-tablenames
