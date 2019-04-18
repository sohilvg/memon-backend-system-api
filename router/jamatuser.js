// // const knex = require('../helpers/knex');
const express = require("express");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const privatekey = 'smit45#bhayo';
const passport = require('passport');
// const LocalStrategy=require('passport-local').Strategy;
const router = express.Router();
require('../config/passport')(passport);
// const bodyParser = require("body-parser");
const knex = require('../db/knexfile');
const algorithm = 'blahblahblah';
const my_secret = 'ha558moj##ha$$';

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
router.post('/v1/authenticate', async (req, res, next) => {

    const data = req.data
    const token = jwt.sign({ data }, my_secret, {
        expiresIn: '1s' // expires in 24 hours
    });
    res.send({ status: 'SUCCESS', message: "Create Token", token: token })

})
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

/*user registration*/
// router.post('/api/v1/signup',verifyToken,async function(req, res) {
//     console.log(req.body);
//     const data = req.data
//     const token = jwt.sign({data}, my_secret, {
//         expiresIn: '10h' // expires in 24 hours
//     });
//     console.log(token);
//     if (!req.body.username || !req.body.password) {
//       res.status(400).send({msg: 'Please pass username and password.'})
//     } else {

//       const result = await knex("usermanagement.users").insert({
//         username: req.body.username,
//         password: req.body.password,
//     });
//     res.send(result);

//         // .then((user) => res.status(201).send(user))
//         // .catch((error) => {
//         //   console.log(error);
//         //   res.status(400).send(error);
//         // });
//     }
//   });
router.post('/api/v1/signup', async (req, res, next) => {
    // const data = req.data
    // const token = jwt.sign({ data }, privatekey, {
    //     expiresIn: '24h' // expires in 24 hours
    // });
    // console.log(token);
    if (!req.body.username || !req.body.password || !req.body.email || !req.body.firstName) {
        res.status(400).send({ msg: 'Please pass username and password.' })
    } else {
        try {
            // const encrypt_username = encrypt(req.body.username);
            // const encrypt_password = encrypt(req.body.password);


            const user = await knex("usermanagement.users")
                .insert({ username: req.body.username, password: req.body.password, email: req.body.email, firstName: req.body.firstName, token: req.token })
                .returning('*')


            jwt.sign({ user }, privatekey, { expiresIn: '24h' }, (err, token) => {
                if (err) { console.log(err) }
                res.send(token);

            });
            // jwt.verify(req.token, privatekey, (err, authData) => {
            //     console.log(authData)
            //     if (err) {
            //         res.sendStatus(403);

            //     } else {
            //         return res.send({
            //             status: "SUCCESS",
            //             message: "User created "
            //             // authData
            //         })
            //     }
            // })

        } catch (error) {

            console.error(error);
        }
    }

});
// const encrypt = (text) => {
//     var cipher = crypto.createCipher(algorithm, my_secret)
//     var crypted = cipher.update(text, 'utf8', 'hex')
//     crypted += cipher.final('hex');
//     return crypted;
// }
/*login user api*/
router.post('/api/v1/login', verifyToken, async (req, res, next) => {
    const { body } = req;
    const { username } = body;
    const { password } = body;
    // const { email } = body;
    if (!req.body.username && !req.body.password) {
        res.status(400).send({ msg: 'Please pass username and password.' })
    } else {
        try {
            //             const encrypt_username = encrypt(req.body.username);
            // const encrypt_password = encrypt(req.body.password);

            const user = await knex("usermanagement.users").where({
                // email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }).first();

            //checking to make sure the user entered the correct username/password combo
            if (username === user.username && password === user.password) {
                jwt.verify(user.token, privatekey, (err, authData) => {
                    console.log(authData)
                    if (err) {
                        res.sendStatus(403);
                        console.log('ERROR: Could not log in');
                    } else {
                        return res.send({
                            status: "SUCCESS",
                            message: 'Successful log in'
                            // authData
                        });
                    }
                })
                //if user log in success, generate a JWT token for the user with a secret key
                //     jwt.sign({ user }, privatekey, { expiresIn: '2h' }, (err, token) => {
                //         if (err) { console.log(err) }
                //         res.send(token);
                //         res.json({
                //             message: 'Successful log in'
                //         });
                //     });

                // } else {
                //     console.log('ERROR: Could not log in');
                // }
            }
        } catch (error) {
            console.error('ERROR: Could not log in');

        }
    }

});
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

//This is a protected route 
router.get('/user/data', checkToken, (req, res) => {
    //verify the JWT token generated for the user
    jwt.verify(req.token, privatekey, (err, authorizedData) => {
        // res.send(result);
        if (err) {
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            const result = knex.select("*").from("sohil.signup");
            console.log(result);
            //If token is successfully verified, we can send the autorized data 
            res.json({
                message: 'Successful log in',
                authorizedData, result: result[0]
            });

            // res.send(result);
            console.log('SUCCESS: Connected to protected route');
        }
    })
});

/* add jamat to database*/
router.post("/api/v1/jamat", async function (req, res) {
    try {
        console.log(JSON.stringify(req.body));
        const result = await knex("usermanagement.jamat").insert({
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            jamat_code: req.body.jamat_code,
            submited_date: new Date()
        });
        res.send(result);
    } catch (error) {
        res.sendStatus(500);
    }

});
/* add zone to database*/
router.post("/api/v1/zone", async function (req, res) {
    console.log(JSON.stringify(req.body));
    const data = req.data
    const token = jwt.sign({ data }, my_secret, {
        expiresIn: '24h' // expires in 24 hours
    });
    console.log(token);

    // const token = getToken(req.headers);

    const result = await knex("usermanagement.zone").insert({
        name: req.body.name,
        zcode: req.body.zcode,
    });
    res.send(result);
});

/* add states to database*/
router.post("/api/v1/states", async function (req, res) {
    try {
        console.log(JSON.stringify(req.body));
        const result = await knex("usermanagement.states").insert({
            state: req.body.state,
            state_code: req.body.state_code,
        });
        res.send(result);
    } catch (error) {
        res.sendStatus(500);
    }

});
/* add cities to database*/
router.post("/api/v1/cities", async function (req, res) {
    try {
        console.log(JSON.stringify(req.body));
        const result = await knex("usermanagement.city").insert({
            city: req.body.city,
            city_code: req.body.city_code,
        });
        res.send(result);
    } catch (error) {
        res.status(500);
    }
});
/* update states from database */
router.put("/api/v1/states", async function (req, res) {
    console.log(`id ${req.params.id}`);
    await knex("usermanagement.states")
        .where("id", "=", req.params.id)
        .update("state_code", req.body.state_code);
    res.send();
});

/*delete zone from DB*/
router.delete('/api/v1/zone/:id', async (req, res) => {
    try {
        const result = await knex("usermanagement.zone")
            .delete()
            .where("id", "=", req.params.id)
        return res
            .status(200)
            .send({ status: 'Successfully Deteted' });
    } catch (error) {
        res.status(500);

    }
});

/*delete member from DB*/
router.delete('/api/v1/member/:id', async (req, res) => {
    try {
        const result = await knex("usermanagement.members")
            .delete()
            .where("id", "=", req.params.id)
        return res
            .status(200)
            .send({ status: 'Successfully Deteted' });
    } catch (error) {
        res.sendStatus(500);
        res.send({ status: 'Failure ' })
    }
});

/*delete states from DB*/
router.delete('/api/v1/states/:id', async (req, res) => {
    try {
        const result = await knex("usermanagement.states")
            .delete()
            .where("id", "=", req.params.id)
        return res
            .status(200)
            .send({ status: 'Successfully Deteted' });
    } catch (error) {
        res.sendStatus(500);
        res.send({ status: 'Fail' });
    }
});

/*delete cities from DB*/
router.delete('/api/v1/cities/:id', async (req, res) => {
    try {
        const result = await knex("usermanagement.city")
            .delete()
            .where("id", "=", req.params.id)
        return res
            .status(200)
            .send({ status: 'Successfully Deteted' });
    } catch (error) {
        res.sendStatus(500);
        res.send({ status: 'Fail' });
    }
});

/*delete jamat from DB*/
router.delete('/api/v1/jamat/:id', async (req, res) => {
    try {
        const result = await knex("usermanagement.jamat")
            .delete()
            .where("id", "=", req.params.id)
        return res
            .status(200)
            .send({ status: 'Successfully Deteted' });
    } catch (error) {
        res.sendStatus(500);
        res.send({ status: 'Fail' });
    }

});

/* Token verify*/
function verifyToken(req, res, next) {
    const bearerHearder = req.headers['authorization']
    if (typeof bearerHearder !== 'undefined') {
        const bearer = bearerHearder.split(' ');
        const bearerToken = bearer[1]
        req.token = bearerToken;
        next()
    } else {
        res.sendStatus(403);
    }
}


module.exports = router;