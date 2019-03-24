const config = require('../knexfile');

const knex = require('knex')(config[process.env.NODE_ENV]);

//expose knex connection object;
module.exports = knex;