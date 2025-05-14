// Función para cargar un Pokenea aleatorio
async function loadRandomPokenea() {
  try {
    const response = await fetch('/api/random');
    const pokenea = await response.json();
    
    // Si estamos en la página de Pokenea, actualizamos la información
    if (window.location.pathname.includes('/pokenea')) {
      document.getElementById('pokenea-nombre').textContent = pokenea.nombre;
      document.getElementById('pokenea-imagen').src = pokenea.imagen;
      document.getElementById('pokenea-frase').textContent = pokenea.frase;
      document.getElementById('pokenea-altura').textContent = pokenea.altura;
      document.getElementById('pokenea-habilidad').textContent = pokenea.habilidad;
      document.getElementById('container-id').textContent = pokenea.containerId;
    }
  } catch (error) {
    console.error('Error al cargar Pokenea:', error);
  }
}

// Función para cargar todos los Pokeneas
async function loadAllPokeneas() {
  try {
    const response = await fetch('/api/pokeneas');
    const data = await response.json();
    
    const pokeneasList = document.getElementById('pokeneas-list');
    if (pokeneasList) {
      pokeneasList.innerHTML = '';
      
      data.pokeneas.forEach(pokenea => {
        const item = document.createElement('div');
        item.className = 'pokenea-item';
        item.innerHTML = `
          <h3>${pokenea.nombre}</h3>
          <p>Altura: ${pokenea.altura} cm</p>
          <p>Habilidad: ${pokenea.habilidad}</p>
        `;
        pokeneasList.appendChild(item);
      });
      
      document.getElementById('container-id-list').textContent = data.containerId;
    }
  } catch (error) {
    console.error('Error al cargar lista de Pokeneas:', error);
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  // Cargar contenido basado en la página
  if (window.location.pathname.includes('/pokenea')) {
    loadRandomPokenea();
    
    // Botón para cargar otro Pokenea
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
      refreshButton.addEventListener('click', loadRandomPokenea);
    }
  } else if (window.location.pathname === '/') {
    // En la página principal, podemos precargar la lista si es necesario
    const showListButton = document.getElementById('show-list-button');
    if (showListButton) {
      showListButton.addEventListener('click', loadAllPokeneas);
    }
  }
});