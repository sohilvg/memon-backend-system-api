var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'sk@96877',
        database: 'meman_system'
    }
});

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.sendStatus(200);
    }
    else {
        //move on
        next();
    }
});

//
//  Get member from database
//
app.get('/member', async function (req, res) {
    const result = await knex('satyam.members')
        .select('members.*', 'jamat.name as jamat_name')
        .leftJoin('satyam.jamat', 'jamat.id', 'members.jamat_id');
    res.send(result);
});

//
//  Add member in database
//
app.post('/member', async function (req, res) {
    console.log(JSON.stringify(req.body));

    const [home_address_id] = await knex('satyam.address')
        .insert({
            address: req.body.home.address1,
            state: req.body.home.state,
            district: req.body.home.district,
            city: req.body.home.city,
            pincode: req.body.home.pincode,
        }).returning('id')
    console.log(JSON.stringify(home_address_id))
    const [work_address_id] = await knex('satyam.address')
        .insert({
            address: req.body.work.address1,
            state: req.body.work.state,
            district: req.body.work.district,
            city: req.body.work.city,
            pincode: req.body.work.pincode,
        }).returning('id')
    const result = await knex('satyam.members')
        .insert({
            name: req.body.firstname,
            father_name: req.body.middlename,
            surname: req.body.lastname,
            aadhar_no: req.body.aadhar,
            sex: req.body.gender,
            email: req.body.email,
            contact_no: req.body.contact,
            f_income: 10000,
            name_sign: req.body.signname,
            des_sign: req.body.desname,
            jamat_id: req.body.jamatid,
            home_address_id: home_address_id,
            website: req.body.website,
            occupation: req.body.business,
            b_description: req.body.discription,
            work_address_id: work_address_id,
            photo_url: '',
            r_place_own: req.body.rown,
            b_place_own: req.body.bown,
            home_date: new Date(),
            member_id: req.body.member_id
        })
    res.send(home_address_id);
});

app.get('/jamat', async function (req, res) {
    const result = await knex.select('*').from('satyam.jamat')
    res.send(result);
});

app.get('/state', async function (req, res) {
    const result = await knex('satyam.city').distinct('state').select();
    res.send(result);
});

app.get('/district', async function (req, res) {
    const result = await knex('satyam.city').distinct('district').select();
    res.send(result);
});

app.get('/city', async function (req, res) {
    const result = await knex('satyam.city').select('city');
    res.send(result);
});

//
//  Add jamat in database
//
app.post('/jamat', async function (req, res) {
    console.log(JSON.stringify(req.body));
    const result = await knex('satyam.jamat')
        .insert({
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            submited_date: new Date()
        })
    res.send(result);
});

app.listen(3000);