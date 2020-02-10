const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dataRoutes = require('./routes/dataRoutes');

const port = 5000;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.get('/',(req,res) => res.send('Bulk Order Api'));
app.use('/v1',dataRoutes);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))