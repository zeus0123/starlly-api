const csvData = require('../model/CsvData');
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
       
        saveToDB(data);

   })
        
    

      
    
}

const saveToDB = (data) => {
    data.forEach((element,index) => {
        setTimeout(() => {
            console.log(element.Parameter1);
        },index*3000) 
    });
}
