'use strict';

const electron = require('electron');
const app = electron.app;  
const BrowserWindow = electron.BrowserWindow;  
const Menu = electron.Menu
const MenuItem = electron.MenuItem

var mainWindow = null;
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

function createWindow(){
  mainWindow = new BrowserWindow({width: 800, height: 600, backgroundColor: '#000080',
    webPreferences: {
        nodeIntegration: true
      }
    });


  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}
app.on('ready', function() {
  createWindow()

  const template = [    
    {
        label:"File",
        submenu:[
            {label:"New Register",
            click: function(){
                console.log('Open new file')
            }},
            {label:"Sign-out"},
            {label:"On/Off Camera"},
            {label:"Open Register"},
            {label:"Export Register"},
            {label:"Close"},
        ]
    },
    
    {
        label:'Edit',
        submenu: [
            {role:'undo'},
            {role:'redo'},
            {type:'separator'},
            {role:'cut'},
            {role:'copy'},
            {role:'paste'},
            {role:'delete'},
            {role:'selectall'}
        ]
    },
    {
      label:'View',
      submenu: [
          {role:'reload'},
          {role:'forcereload'},
          {type:'separator'},
          {label:'Daily Report'},
          {label:'Weekly Report'},
          {label:'Monthly Report'},
      ]
  },{
    label:'Tools',
    submenu: [
        {label:'Delete Register'},
        {label:'Hardware'},
    ]
},
    
    
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)   

const ctxMenu = new Menu()
ctxMenu.append(new MenuItem({
    label:'Edit',
    submenu: [
      {role:'undo'},
      {role:'redo'},
      {type:'separator'},
      {role:'cut'},
      {role:'copy'},
      {role:'paste'},
      {role:'pasteandmatchstyle'},
      {role:'delete'},
      {role:'selectall'}
    ]
}))
mainWindow.webContents.on('context-menu', function(e,params){
  ctxMenu.popup(mainWindow, params.x,params.y)
})

});

