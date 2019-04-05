const express = require("express");
const router = express.Router();
// const bodyParser = require("body-parser");
const knex = require('../knexfile');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    //intercepts OPTIONS method
    if ("OPTIONS" === req.method) {
        //respond with 200
        res.sendStatus(200);
    } else {
        //move on
        next();
    }
});
/*  Get member from database */
router.get("/member", async function (req, res) {
    const result = await knex("usermanagement.members")
        .select("members.*", "jamat.name as jamat_name")
        .leftJoin("usermanagement.jamat", "jamat.id", "members.jamat_id");
    res.send(result);
});

/*get jamats from database*/
router.get("/jamat", async function (req, res) {
    const result = await knex.select("*").from("usermanagement.jamat");
    res.send(result);
});
/* get states from database*/
router.get("/states", async function (req, res) {
    const result = await knex("usermanagement.states")
        .select("*")
        .orderBy("state", "asc");
    res.send(result);
});
/* get districts from database*/
router.get("/district", async function (req, res) {
    const result = await knex("usermanagement.city")
        .distinct("district")
        .select();
    res.send(result);
});
/* get cities from database*/
router.get("/city", async function (req, res) {
    const result = await knex("usermanagement.city").select("*");
    res.send(result);
});
/* get zones from database*/
router.get("/zone", async function (req, res) {
    const result = await knex.select("*").from("usermanagement.zone");
    res.send(result);
});
// };
module.exports = router;