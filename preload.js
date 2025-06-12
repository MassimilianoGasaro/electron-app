const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  raddoppia: (numero) => ipcRenderer.invoke('raddoppia-numero', numero)
});