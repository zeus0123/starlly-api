const Knex = require('knex');

// Initialize knex.
const knex = Knex({
  client: 'mysql',
  useNullAsDefault: true,
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'arsenal#7',
    database : 'starlly',
    
  }
});

// Give the knex instance to objection.
module.exports =  knex;