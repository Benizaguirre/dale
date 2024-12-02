
const listaGastos = document.getElementById('listaGastos');
const formulario = document.getElementById('gastoForm');
const infoBlock = document.getElementById('infoBlock');
const totalGastos = document.getElementById('totalGastos');


document.addEventListener('DOMContentLoaded', () => {
    cargarGastos(); 
});


formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const descripcion = document.getElementById('descripcion').value.trim();
    const monto = parseFloat(document.getElementById('monto').value.trim());
    const fecha = document.getElementById('fecha').value;


    if (!descripcion || isNaN(monto) || !fecha) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

   
    const gasto = {
        id: Date.now(), 
        descripcion,
        monto,
        fecha,
    };

  
    guardarGasto(gasto);
    mostrarGasto(gasto);
    formulario.reset(); 
});


const guardarGasto = (gasto) => {
    let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
    gastos.push(gasto);
    localStorage.setItem('gastos', JSON.stringify(gastos));
};


const cargarGastos = () => {
    const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
    gastos.forEach(mostrarGasto);
};


const mostrarGasto = (gasto) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        ${gasto.descripcion} - $${gasto.monto.toFixed(2)} <small>(${gasto.fecha})</small>
        <button class="btn btn-danger btn-sm" onclick="eliminarGasto(${gasto.id})">X</button>
    `;
    listaGastos.appendChild(li);
};


const eliminarGasto = (id) => {
    let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
    gastos = gastos.filter((gasto) => gasto.id !== id); 
    localStorage.setItem('gastos', JSON.stringify(gastos)); 
    listaGastos.innerHTML = ''; 
    gastos.forEach(mostrarGasto); 
};


const calcularTotal = () => {
    const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
    const total = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);
    totalGastos.textContent = `$${total.toFixed(2)}`;
};


const mostrarInfo = () => {
    if (infoBlock.classList.contains('activo')) {
        infoBlock.classList.remove('activo');
    } else {
        infoBlock.classList.add('activo');
    }
};