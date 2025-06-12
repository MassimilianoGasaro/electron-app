document.getElementById('invia').addEventListener('click', async () => {
    try {
      const valore = document.getElementById('numero').value;
      const numero = parseInt(valore);
      if (isNaN(numero)) {
        throw new Error('Inserisci un numero valido');
      }
      const risultato = await window.electronAPI.raddoppia(numero);
      document.getElementById('risultato').innerText = `Risultato: ${risultato}`;
    } catch (error) {
      document.getElementById('risultato').innerText = `Errore: ${error.message}`;
    }
  });