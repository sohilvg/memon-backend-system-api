// Update with your config settings.
// 'use strict';

// module.exports = {
//   local: {
//     client: 'postgresql',
//     connection: {host: '127.0.0.1', user: 'postgres', password: 'sk@96877', database: 'meman_system'},
//     pool: {
//       min: 2,
//       max: 10
//     },
//     debug: false
//   }
// };
const knex = require("knex")({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "sk@96877",
        database: "meman_system"
    }
});
module.exports = knex;