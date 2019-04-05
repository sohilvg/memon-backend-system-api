const config = require('../knexfile');
//expose knex connection object;
const knex = require("knex")
module.exports = knex;