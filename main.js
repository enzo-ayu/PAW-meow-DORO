const { app, BrowserWindow, ipcMain, shell } = require("electron");

let mainWindow;


app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 596,
        height: 656,
        resizable: false, 
        maximizable: false, 
        frame: false,  
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile("Starting Page.html");
    mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.webContents.setZoomLevel(0); 
    });
    

    // Handle close button click
    ipcMain.on("close-window", () => {
        if (mainWindow) {
            mainWindow.close();
        }
    });

    // Handle minimize button click
    ipcMain.on("minimize-window", () => {
        if (mainWindow) {
            mainWindow.minimize();
        }
    });

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on("open-external-link", (event, url) => {
    shell.openExternal(url);
});