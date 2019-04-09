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
router.post("/api/v1/member", async function (req, res) {
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
        const [family_members_id] = await knex("usermanagement.family_members")
        .insert({
            f_name: req.body.fm_name,
            age: req.body.age,
            sex: req.body.sex,
            f_blood_group: req.body.f_blood_group,
            qualification: req.body.qualification,
            f_contact: req.body.f_contact,
        })
        .returning("id");
        console.log(JSON.stringify(family_members_id));

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
        family_members_id: family_members_id,

    });
    res.send(result);
    console.log(result);
    res.send(home_address_id);
});
/* add jamat to database*/
router.post("/api/v1/jamat", async function (req, res) {
    console.log(JSON.stringify(req.body));
    const result = await knex("usermanagement.jamat").insert({
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        jamat_code: req.body.jamat_code,
        submited_date: new Date()
    });
    res.send(result);
});
/* add zone to database*/
router.post("/api/v1/zone", async function (req, res) {
    console.log(JSON.stringify(req.body));
    const result = await knex("usermanagement.zone").insert({
        name: req.body.name,
        zcode: req.body.zcode,
    });
    res.send(result);
});

/* add states to database*/
router.post("/api/v1/states", async function (req, res) {
    console.log(JSON.stringify(req.body));
    const result = await knex("usermanagement.states").insert({
        state: req.body.state,
        state_code: req.body.state_code,
    });
    res.send(result);
});
/* add cities to database*/
router.post("/api/v1/cities", async function (req, res) {
    console.log(JSON.stringify(req.body));
    const result = await knex("usermanagement.city").insert({
        city: req.body.city,
        city_code: req.body.city_code,
    });
    res.send(result);
});
/* update states from database */
router.put("/api/v1/states", async function (req, res) {
    console.log(`id ${req.params.id}`);
    await knex("usermanagement.states")
        .where("id", "=", req.params.id)
        .update("state_code", req.body.state_code);
    res.send();
});
// };
router.delete('/api/v1/zone/:id', async(req, res) => {
    try {
        const result = await knex("usermanagement.zone")
        .delete()
        .where("id", "=", req.params.id)
    return res
        .status(200)
        .send({status: 'Successfully Deteted'});
    } catch (error) {
        res.status(500);

    }
});

/*delete member from DB*/
router.delete('/api/v1/member/:id', async(req, res) => {
    try {
        const result = await knex("usermanagement.members")
        .delete()
        .where("id", "=", req.params.id)
    return res
        .status(200)
        .send({status: 'Successfully Deteted'});    
    } catch (error) {
        res.sendStatus(500);
        res.send({status:'Failure '})
    }
});

/*delete states from DB*/
router.delete('/api/v1/states/:id', async(req, res) => {
    try {
        const result = await knex("usermanagement.states")
        .delete()
        .where("id", "=", req.params.id)
    return res
        .status(200)
        .send({status: 'Successfully Deteted'});    
    } catch (error) {
        res.sendStatus(500);
        res.send({status: 'Fail'});
    }
});

/*delete cities from DB*/
router.delete('/api/v1/cities/:id', async(req, res) => {
    try {
        const result = await knex("usermanagement.city")
        .delete()
        .where("id", "=", req.params.id)
    return res
        .status(200)
        .send({status: 'Successfully Deteted'});    
    } catch (error) {
        res.sendStatus(500);
        res.send({status: 'Fail'});
    }
});

/*delete jamat from DB*/
router.delete('/api/v1/jamat/:id', async(req, res) => {
    try {
        const result = await knex("usermanagement.jamat")
        .delete()
        .where("id", "=", req.params.id)
    return res
        .status(200)
        .send({status: 'Successfully Deteted'});    
    } catch (error) {
        res.sendStatus(500);
        res.send({status: 'Fail'});
    }
    
});
module.exports = router;