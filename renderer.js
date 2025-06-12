document.getElementById('caricaDati').addEventListener('click', async () => {
  try {
    const dati = await window.electronAPI.getData();
    const lista = document.getElementById('listaDati');
    lista.innerHTML = ''; // Pulisce la lista
    dati.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = JSON.stringify(item);
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Errore durante il caricamento dei dati:', error);
  }
});