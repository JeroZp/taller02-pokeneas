// public/js/main.js

// Carga un Pokenea aleatorio (para /pokenea)
async function loadRandomPokenea() {
  try {
    const response = await fetch('/api/random');
    const pokenea  = await response.json();

    document.getElementById('pokenea-nombre').textContent     = pokenea.nombre;
    document.getElementById('pokenea-imagen').src            = pokenea.imagen;
    document.getElementById('pokenea-frase').textContent     = pokenea.frase;
    document.getElementById('pokenea-altura').textContent    = pokenea.altura;
    document.getElementById('pokenea-habilidad').textContent = pokenea.habilidad;
    document.getElementById('container-id').textContent      = pokenea.containerId;
  } catch (error) {
    console.error('Error al cargar Pokenea:', error);
  }
}

// Carga todos los Pokeneas 
async function loadAllPokeneas() {
  try {
    const response = await fetch('/api/pokeneas');
    const data     = await response.json(); 

    const listEl = document.getElementById('pokeneas-list');
    listEl.innerHTML = '';

    data.pokeneas.forEach(p => {
      const item = document.createElement('div');
      item.className = 'pokenea-item';
      item.innerHTML = `
        <h3>${p.nombre}</h3>
        <p>Altura: ${p.altura} cm</p>
        <p>Habilidad: ${p.habilidad}</p>
      `;
      listEl.appendChild(item);
    });

    document.getElementById('container-id-list').textContent = data.containerId;
  } catch (error) {
    console.error('Error al cargar lista de Pokeneas:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('/pokenea')) {
    // Página individual de un Pokenea
    loadRandomPokenea();

    const refreshBtn = document.getElementById('refresh-button');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', loadRandomPokenea);
    }

  } else if (path === '/' || path.endsWith('index.html')) {
    // Página principal
    const showListBtn = document.getElementById('show-list-button');
    const listSection = document.getElementById('list-section');

    if (showListBtn && listSection) {
      showListBtn.addEventListener('click', () => {
        listSection.hidden = false;
        loadAllPokeneas();
      });
    }

    // Botón para ver el JSON 
    const jsonBtn = document.getElementById('json');
    if (jsonBtn) {
      jsonBtn.addEventListener('click', () => {
        window.location.href = '/api/pokeneas';
      });
    }
  }
});
