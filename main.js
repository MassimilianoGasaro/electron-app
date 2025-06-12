import { app, BrowserWindow, ipcMain } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';

// Ottieni il valore di __dirname nei moduli ES
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configura il database SQLite
const db = new sqlite3.Database(join(__dirname, 'database.db'), (err) => {
    if (err) {
      console.error('Errore durante la connessione al database:', err.message);
    } else {
      console.log('Connessione al database SQLite riuscita.');
    }
  });

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

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('raddoppia-numero', async (event, numero) => {
    console.log('Ricevuto dal renderer:', numero);
    return numero * 2;
});

// Gestisci le richieste IPC per il database
ipcMain.handle('get-data', async () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM dati', [], (err, rows) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      });
    });
  });