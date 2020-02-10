const csvData = require('../model/CsvData');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const csvParser = csv(); 


const csvPath = path.basename('./Site_Bittenahalli_raw_data.csv');
 

exports.dataAnalysis = (req,res) => {
    
   const data = [];

  
   const fileStream  = fs.createReadStream(csvPath);

 
  
   csvParser.on('data',async (row) => {
    csvParser.pause();   
    fileStream.unpipe()
       
       const insertData = await csvData.query().insert({
           parameter_one : row.Parameter1,
           parameter_five : row.Parameter5
       })
       
       setTimeout(() => {
           csvParser.resume();
           fileStream.pipe(csvParser);
       },1000*60)
      
   })



    csvParser.on('end', () => {
           
       console.log('finished');
      
    })

    fileStream.pipe(csvParser);
}
