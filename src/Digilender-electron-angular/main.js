const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
    scanWifi();
    win = new BrowserWindow({ width: 1280, height: 800 });
    win.setMenu(null);

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
}

function scanWifi() {
    var wifi = require('node-wifi');

    // Initialize wifi module
    // Absolutely necessary even to set interface to null
    wifi.init({
        iface: null // network interface, choose a random wifi interface if set to null
    });

    // Scan networks
    wifi.scan(function (err, networks) {
        if (err) {
            console.log(err);
        } else {
            console.log(networks);
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