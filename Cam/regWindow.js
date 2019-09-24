
const {BrowserWindow} = require('electron').remote;
function regWindow(){
    regWindow = new BrowserWindow({width: 800, height: 600, backgroundColor: '#000080',
      webPreferences: {
          nodeIntegration: true
        }
      });
    regWindow.loadURL('file://' + __dirname + '/create_register.html');  
    //mainWindow.webContents.openDevTools();
  
    regWindow.on('closed', function() {
      regWindow = null;
    });
  }