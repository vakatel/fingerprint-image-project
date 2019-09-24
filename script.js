var enabled = false;
var WebCamera = require("webcamjs");
var remote = require('electron').remote;
const {dialog} = require('electron').remote; 
var fs = require('fs');

const db = require('electron-db');





document.getElementById("start").addEventListener('click',function(){
    if(!enabled){
        enabled = true;
        WebCamera.attach('#came');
        console.log("The camera has been started");
    }else{
        enabled = false;
        WebCamera.reset();
        console.log("The camera has been disabled");
    }
},false);
function processBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),response = {};
  if (matches.length !== 3) {
      return new Error('Invalid input string');
  }
  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');
  return response;
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 

document.getElementById("savefile").addEventListener('click',function(){

    var itemId = makeid(5);
   document.getElementById('scanId').innerHTML= itemId;
    document.getElementById('picId').innerHTML = itemId;

    const path = require('path');
    const location = path.join(__dirname,'');
    let obj = new Object();
    obj.name = itemId;
    if (db.valid('register',location)) {
    db.insertTableContent('register',location, obj, (succ, msg) => {
        console.log("Success: " + succ);
        console.log("Message: " + msg);
    })
    }
    
    console.log(makeid(5));

    if(enabled){
        WebCamera.snap(function(data_uri) {
            var imageBuffer = processBase64Image(data_uri);
            dialog.showSaveDialog({
                filters: [
                    { name: 'Images', extensions: ['png'], },
                ]
            },function (fileName) {
                   if (fileName === undefined){
                        console.log("You didn't save the file because you exit or didn't give a name");
                        return;
                   }
                   fileName = __dirname + '/photos/' +itemId +".png";
                   fs.writeFile(fileName, imageBuffer.data, function(err) {
                       if(err){
                           console.log("Cannot save the file");
                       }else{
                           alert("Image saved succesfully");
                       }
                   });
            });
        });
    }else{
        console.log("Please enable the camera first to take the snapshot !");
    }
    
    
},false);

