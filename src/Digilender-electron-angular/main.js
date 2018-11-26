const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
var log = require('electron-log');
const DBManager = require ('./DBManager');


let win;
log.info("test");
let db = new DBManager();

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
        console.log(arg);
        console.log(event); 
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
