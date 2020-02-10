const { Model } = require('objection');
const knex = require('../config/database');

Model.knex(knex);

class CsvData extends Model {

    static get tableName() {
        return 'csv_data';
    }
}

module.exports = CsvData;