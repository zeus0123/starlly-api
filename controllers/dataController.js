const CsvData = require('../model/CsvData');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const csvParser = csv(); 
const es = require('event-stream');


const csvPath = path.basename('./Site_Bittenahalli_raw_data.csv');
 

exports.dataAnalysis = (req,res) => {
    
   
let data = [];
  
 var fileStream =  fs.createReadStream(csvPath)
   .on('error', () => {
       // handle error
   })
 
   .pipe(csv())
   .on('data', (row) => {
          data.push(row);  
   })

   .on('end', () => {
       console.log('finish');
        res.end();
        saveToDB(data);

   })
        
    

      
    
}

const saveToDB = (data) => {
    data.forEach((element,index) => {
        setTimeout(async () => {
            const insertData = await CsvData.query().insert({
                parameter_one : element.Parameter1,
                parameter_two : element.Parameter2,
                parameter_three : element.Parameter3,
                parameter_five : element.Parameter5
            })
        },index*3000) 
    });
}

exports.getData =  (req,res) => {
      
    CsvData.query().then(results => {
        return res.status(200).send({
            code : 1,
            data : results
        });
    }).catch(err => {
        res.status(500).send({
            code: 0,
            message : 'Server Issue'
        })
    })
    

    
}

exports.getLatestRow = (req,res) => {
    CsvData.query().orderBy('created_at','desc').limit(1)
        .then(result => {
            return res.status(200).send({
                code: 1,
                data : result
            })
        }).catch(err => {
            res.status(500).send({
                code : 0,
                message : 'Server Issue'
            })
        })
}
