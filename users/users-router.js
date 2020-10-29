const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./users-model");
const { restrict } = require("./users-middleware");

const router = express.Router()

router.get("/users", restrict(), async (req, res, next) => {
    try{
        res.json(await Users.find())
    } catch(err) {
        res.json("You shall not pass")
    }
})

router.post("/register", async (req, res, next) => {
    try {
        const {username, password} = req.body;
        //is the first() here redundant because it shouldn't be possible to have multiple useres with same name? Or is it a double check in case it slipped by somehow?
        const user = await Users.findBy({username}).first()

        if(user) {
            return res.status(409).json({
                message: "Username is taken"
            })
        }

        const newUser = await Users.add({
            username,
            password: await bcrypt.hashSync(password, 14),
        })
        res.status(201).json
    }
    catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {

    try {
        const {username, password} = req.body
        const user = await Users.findBy({username}).first()

        if(!user) {
            return res.status(401).json({
                message: "You shall not pass",
            })
        }
        const passwordValid = await bcrypt.compare(password, user.password)

        if(!passwordValid) {
            return res.status(401).json({
                message: "You shall not pass",
            })
        }
        //A new session is basically "this person is logged in for a session"

        req.session.user = user

        res.json({
            message: `Welcome ${user.username}!`,
        }) 
        } catch (err) {
            next(err)
        }


})

module.exports = router;

