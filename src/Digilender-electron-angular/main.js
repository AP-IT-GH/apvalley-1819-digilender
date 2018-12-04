const { app, BrowserWindow } = require("electron");
'use strict';
const path = require("path");
const url = require("url");
const log = require('electron-log');
const DBManager = require('./DBManager');
const promiseIpc = require('electron-promise-ipc');
//const electron = require('electron');

let win;
log.info("starting");
let db = new DBManager();

//require('electron-reload')(__dirname);

function createWindow() {
    win = new BrowserWindow();
    win.webContents.openDevTools();
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
    promiseIpc.on('users', (arg) => {
        if (arg.action == 'get'){
            return db.getUsers().then((users) => {
              var tmp = JSON.stringify(users);
              console.log(tmp);
              return tmp;
            });
        }
        else if (arg.action == 'put'){
            return db.addUser(arg.value).then((user) => {
              var tmp = JSON.stringify(user);
              console.log(tmp);
              return tmp;
            });
        }
        else{
            return {error: "invalid action"};
        }
    });

    promiseIpc.on('events', (arg) => {
        if (arg.action == 'get'){
            return db.getEvents(arg.userId)
              .then((events) => {
                var tmp = JSON.stringify(events);
                console.log(tmp);
                return tmp;
              });
        }
        else if (arg.action == 'put'){
            return db.addEvent(arg.value).then((newEvent) => {
              var tmp = JSON.stringify(newEvent);
              console.log(tmp);
              return tmp;
            });
        }
    });
    /*
    ipcMain.on("querryDB", (event, arg) => {
        log.info(arg);
        args = arg.split(" ");
        if (args.length < 2){
            event.returnValue = {"error": "too few arguments"};
            return;
        }
        else {
            switch (args[0]) {
                case "events":
                    if (args[1] == "all"){
                        event.returnValue = db.getEvents();
                        return;
                    }
                    else if (args[1] == "of"){
                        event.returnValue = db.getEvents(args[2]);
                        return;
                    }
                    break;
            }
            event.returnValue = {"error": "argument error"};
        }

    });
    */
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
