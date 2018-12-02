const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const CONFIG = require('./settings.js');
const CalendarAPI= require('node-google-calendar');
var log = require('electron-log');
const DBManager = require('./DBManager');

let win;
log.info("starting");
let db = new DBManager();
let cal = new CalendarAPI(CONFIG);

 let params = {
    timeMin: '2017-05-20T06:00:00+08:00',
    timeMax: '2019-05-25T22:00:00+08:00',
    singleEvents: true,
    orderBy: 'startTime'
    };
    var calId = 'antoinevmasure@gmail.com';

   cal.Events.list(calId,params)
        .then(json=>{
            console.log("List of calendar events");
            console.log(json);
        }).catch(err=>{
            console.log('error: llllistingevents -'+err.message);
        });
  
     

function createWindow() {

    win = new BrowserWindow();
    //win = new BrowserWindow({ width: 1280, height: 800 );
    win.setFullScreen(true)

    // Uncomment the following line to remove the menu bar
    // win.setMenu(null);

    // load the dist folder from Angular
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    // The following is optional and will open the DevTools:
    // win.webContents.openDevTools()
    win.on("closed", () => {
        win = null;
    });

    //respond to messages
    ipcMain.on('querryDB', (event, arg) => {
        log.info(arg);
        log.info(event);
        event.returnValue = 'returnValue';
    });
}

app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// initialize the app's main window
app.on("activate", () => {
    if (win === null) {
        createWindow();


    }
});
