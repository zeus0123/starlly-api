const CsvData = require('../model/CsvData');
const Alert = require('../model/Alert');
const PowerOutage = require('../model/PowerOutage');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const { raw } = require('objection');
const moment = require('moment');
const csvPath = path.basename('./Site_Bittenahalli_raw_data.csv');
 

exports.dataAnalysis = (req,res) => {
    
   
res.end();

let alert_count = 0;
let power_outage = 0;
  
 var fileStream =  fs.createReadStream(csvPath)
   .on('error', () => {
       // handle error
   })
 
   .pipe(csv())
   .on('data', (row) => {
          fileStream.pause();
          setTimeout(async () => {
             if(row.Parameter1 > 3){
                 alert_count++;
             }else{
                 alert_count = 0;
             } 

             if(row.Parameter5 == 0){
                 power_outage++;
             }else{
                 power_outage = 0;
             }

            const insertData = await CsvData.query().insert({
                parameter_one : row.Parameter1,
                parameter_two : row.Parameter2,
                parameter_three : row.Parameter3,
                parameter_five : row.Parameter5,
                alert_read : row.Parameter1 > 3 ? 1 : 0,
                is_power_outage : row.Parameter5 == 0 ? 1 : 0
            });

            if(alert_count == 5){
                 const alerts = await Alert.query().insert({
                     name : 'Alert1'
                 })
               alert_count = 0;  
            }

            if(power_outage == 10){
                console.log(insertData.id);
                 const addPowerOutage = await PowerOutage.query().insert({
                     data_id : insertData.id
                 })
 
               power_outage= 0;  
            }

                
               fileStream.resume();  
          },2000)  
   })

   .on('end', () => {
       console.log('finish');
        

   })
        
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

exports.getParameterOneData =  (req,res) => {

      CsvData.query().orderBy('created_at','desc').limit(100).pluck('parameter_one')
        .then(data => {
            return res.status(200).send(data);
        })
}

exports.getParameterTwoData = (req,res) => {
    CsvData.query().orderBy('created_at','desc').limit(100).pluck('parameter_two')
    .then(data => {
        return res.status(200).send(data);
    })
}

exports.getParameterThreeData = (req,res) => {
    CsvData.query().orderBy('created_at','desc').limit(100).pluck('parameter_three')
    .then(data => {
        return res.status(200).send(data);
    })
}

exports.getTime = (req,res) => {
    CsvData.query().pluck('created_at').orderBy('created_at','desc').limit(100)
    .then(data => {
        return res.status(200).send(data);
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

exports.powerOutageTime = (req,res) => {

     PowerOutage.query().orderBy('created_at','desc').limit(1)
                .then(powerOutage => {
                        CsvData.query().where('id','>',powerOutage[0].data_id).where('is_power_outage',0).limit(1)
                            .then(time => {
                                if(time.length > 0){
                                    var timeConsumed = moment(time[0].created_at,'DD/MM/YYYY HH:mm:ss').diff(moment(powerOutage[0].created_at,'DD/MM/YYYY HH:mm:ss'));
                                    var d = moment.duration(timeConsumed);
                                    console.log(d.format('minutes'))
                                }
                            })
                })
    

}

exports.lastPowerOutage = async(req,res) => {
    const powerOutageTime = await PowerOutage.query().orderBy('created_at','desc').limit(1);

    return res.status(200).send(powerOutageTime);
}

exports.getAlertCount = async() => {
    const alertCount = await Alert.query().select(raw('count(*) as count'));
   
   
    return res.status(200).send({
        count : alertCount[0].count
    });  
}


