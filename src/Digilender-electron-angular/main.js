const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
var log = require('electron-log');

let win;
log.info("test");

function createWindow() {
    win = new BrowserWindow();
    //win = new BrowserWindow({ width: 1280, height: 800 );
    win.setFullScreen(true)

    // Uncomment the following line to remove the menu bar
    // win.setMenu(null);

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