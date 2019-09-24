
const db = require('electron-db');
const electron = require('electron');
const path = require('path');

const location = path.join(__dirname,'');
db.createTable('register',location,(succ,msg)=>{
    if(succ){
        console.log('created successfully'+succ);
    }else{
        console.log('Unsuccessful'+msg);
    }
})