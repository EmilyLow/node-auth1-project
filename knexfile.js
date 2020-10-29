// Update with your config settings.

module.exports = {

  client: "sqlite3",
	useNullAsDefault: true,
	connection: {
		filename: "./database/auth.db3",
	},
  //!! Why did this not work? Did I need to make migrations folder first? But it didn't work even with a migrations folder

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

//Remember: knex migrate:make make-tablename
// knex migrate:latest
