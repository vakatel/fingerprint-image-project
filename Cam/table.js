const db = require('electron-db');
const electron = require('electron');
const path = require('path');

const location = path.join(__dirname,'');
let obj = new Object();
    obj.sn = "yes";
    obj.name = "Got it";
    
    if (db.valid('register',location)) {
    db.insertTableContent('register',location, obj, (succ, msg) => {
        console.log("Success: " + succ);
        console.log("Message: " + msg);
    })
    }