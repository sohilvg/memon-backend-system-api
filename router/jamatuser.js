// // const knex = require('../helpers/knex');
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

/* add members to database*/
router.post("/member", async function (req, res) {
    console.log(JSON.stringify(req.body));
    const [home_address_id] = await knex("usermanagement.address")
        .insert({
            address: req.body.home.address1,
            state: req.body.home.state,
            district: req.body.home.district,
            city: req.body.home.city,
            pincode: req.body.home.pincode
        })
        .returning("id");
    console.log(JSON.stringify(home_address_id));
    const [work_address_id] = await knex("usermanagement.address")
        .insert({
            address: req.body.work.address1,
            state: req.body.work.state,
            district: req.body.work.district,
            city: req.body.work.city,
            pincode: req.body.work.pincode
        })
        .returning("id");
    const result = await knex("usermanagement.members").insert({
        name: req.body.firstname,
        father_name: req.body.middlename,
        surname: req.body.lastname,
        aadhar_no: req.body.aadhar,
        sex: req.body.gender,
        email: req.body.email,
        contact_no: req.body.contact_no,
        jamat_id: req.body.jamatid,
        home_address_id: home_address_id,
        website: req.body.website,
        occupation: req.body.business,
        b_description: req.body.discription,
        work_address_id: work_address_id,
        photo_url: "",
        r_place_own: req.body.rown,
        b_place_own: req.body.bown,
        home_date: new Date(),
        member_id: req.body.member_id,
        blood_group: req.body.blood_group,
        contact_2: req.body.contact_2,
        capable: req.body.capable,

    });
    res.send(result);
    console.log(result);
    res.send(home_address_id);
});
/* add jamat to database*/
router.post("/jamat", async function (req, res) {
    console.log(JSON.stringify(req.body));
    const result = await knex("usermanagement.jamat").insert({
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        submited_date: new Date()
    });
    res.send(result);
});
/* add zone to database*/
router.post("/zone", async function (req, res) {
    console.log(JSON.stringify(req.body));
    const result = await knex("usermanagement.zone").insert({
        name: req.body.name,
        zcode: req.body.zcode,
    });
    res.send(result);
});

/* add states to database*/
router.post("/states", async function (req, res) {
    console.log(JSON.stringify(req.body));
    const result = await knex("usermanagement.states").insert({
        state: req.body.state,
        state_code: req.body.state_code,
    });
    res.send(result);
});
/* add cities to database*/
router.post("/cities", async function (req, res) {
    console.log(JSON.stringify(req.body));
    const result = await knex("usermanagement.city").insert({
        city: req.body.city,
        city_code: req.body.city_code,
    });
    res.send(result);
});
/* update states from database */
// router.put("/states/:state_id", async function (req, res) {
//     console.log(`state_id ${req.params.state_id}`);
//     await knex("usermanagement.states")
//         .where("id", "=", req.params.state_id)
//         .update("state_code", req.body.state_code);
//     res.send();
// });
router.put("/states", async function (req, res) {
    console.log(`state_id ${req.params.state_id}`);
    await knex("usermanagement.states")
        .where("id", "=", req.params.state_id)
        .update("state_code", req.body.state_code);
    res.send();
});
// };
router.put("/states", async function (req, res) {
    console.log(`state_id ${req.params.state_id}`);
    await knex("usermanagement.states")
        .where("id", "=", req.params.state_id)
        .update("state_code", req.body.state_code);
    res.send();
});
module.exports = router;