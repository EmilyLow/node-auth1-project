

const express = require("express");
//!! Check how many of these are essential for the concept vs extras
const helmet = require("helmet")
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
//End of ones to check
const db = require("./database/config");
const usersRouter = require("./users/users-router");

const server = express();
const port = process.env.PORT||5000;


//!!Is this where these "activate". Do they need to be used anywhere else for their core functionlity?
server.use(helmet());
server.use(cors());
//!Does order matter?
server.use(express.json());
//! Figuring out this one seems especially important

server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "keep it secret, keep it safe",
    store: new KnexSessionStore({
        knex: db,
        createtable: true,
    })
}))

server.use(usersRouter);

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something went wrong",
    })
})

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})