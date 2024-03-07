const { app, BrowserWindow } = require("electron");
// const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Be mindful of security implications
    },
  });

  const startUrl =
    // process.env.ELECTRON_START_URL ||
    // `file://${path.join(__dirname, "../build/index.html")}`;
  mainWindow.loadURL(startUrl);
}

app.whenReady().then(createWindow);
