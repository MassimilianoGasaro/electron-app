import { app, BrowserWindow, ipcMain } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Ottieni il valore di __dirname nei moduli ES
const __dirname = dirname(fileURLToPath(import.meta.url));

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true, // Important for Electron 12 and above
            enableRemoteModule: true,
            preload: join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');

}

app.whenReady().then(() => {

    createWindow();
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

ipcMain.handle('raddoppia-numero', async (event, numero) => {
    console.log('Ricevuto dal renderer:', numero);
    return numero * 2;
})