const { app, BrowserWindow } = require("electron");
'use strict';
const path = require("path");
const url = require("url");
const log = require('electron-log');
const DBManager = require('./DBManager');
const promiseIpc = require('electron-promise-ipc');
const Wifi = require('node-wifi');
//const electron = require('electron');

let win;
log.info("starting");
let db = new DBManager();
Wifi.init({ iface: null });

//require('electron-reload')(__dirname);

function createWindow() {
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nativeWindowOpen: true
        }
    });

    // win = new BrowserWindow();
    // win.setFullScreen(true)

    // Uncomment the following line to remove the menu bar
    //win.setMenu(null);

    // load the dist folder from Angular
    win.loadURL(
        url.format({
            pathname: 'http://localhost:4200'
        })
    );

    // The following is optional and will open the DevTools:
    win.webContents.openDevTools()
    win.on("closed", () => {
        win = null;
    });

    //respond to messages
    promiseIpc.on('users', (arg) => {
        if (arg.action == 'get') {
            return db.getUsers(arg.userId)
                .then((users) => {
                    var tmp = JSON.stringify(users);
                    console.log("get users: ");
                    console.log(tmp);
                    return tmp;
                });
        }
        else if (arg.action == 'put') {
            return db.addUser(arg.value).then((user) => {
                var tmp = JSON.stringify(user);
                console.log(tmp);
                return tmp;
            });
        }
        else if (arg.action == 'delete') {
            return db.deleteUser(arg.value).then((user) => {
                var tmp = JSON.stringify(user);
                console.log(tmp);
                return tmp;
            });
        }
        else {
            return { error: "invalid action" };
        }
    });

    promiseIpc.on('events', (arg) => {
        if (arg.action == 'get') {
            return db.getEvents(arg.userId)
                .then((events) => {
                    var tmp = JSON.stringify(events);
                    console.log(tmp);
                    return tmp;
                });
        } else if (arg.action == 'delete') {
            return db.deleteEvent(arg.value).then((event) => {
                var tmp = JSON.stringify(event);
                console.log(tmp);
                return tmp;
            });
        }
        else if (arg.action == 'put') {
            console.log("putting event");
            console.log(arg.value);
            return db.addEvent(arg.value).then((newEvent) => {
                console.log("returning event:");
                console.log(newEvent);
                var tmp = JSON.stringify(newEvent);
                console.log(tmp);
                return tmp;
            }).catch(function () {
                console.log(arguments);
            });
        }
    });

    promiseIpc.on('wifi', (arg) => {
        console.log("got request");
        console.log(arg);
        if (arg.action == 'get') {
            return Wifi.scan()
                .catch((error) => {
                    console.log(error);
                    return error;
                });
        }
        else {
            return Wifi.connect(arg)
                .catch((error) => {
                    console.log(error);
                    return error;
                });
        }
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
