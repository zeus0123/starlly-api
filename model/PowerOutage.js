const { Model } = require('objection');
const knex = require('../config/database');

Model.knex(knex);

class PowerOutage extends Model {

    static get tableName() {
        return 'power_outage';
    }
}

module.exports = PowerOutage;