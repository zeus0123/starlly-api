const { Model } = require('objection');
const knex = require('../config/database');

Model.knex(knex);

class Alert extends Model {

    static get tableName() {
        return 'alert';
    }
}

module.exports = Alert;