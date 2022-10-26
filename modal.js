const btnLanzarModal = document.querySelector('#lanzar-modal');
const btnOcultarModal = document.querySelector('#ocultar-modal');
const btnReload = document.querySelector('#newSimulation')

const contModal = document.querySelector('.form-ingreso');

const CPUInput = document.querySelector('#CPU');
const TiempoInput = document.querySelector('#Tiempo');

btnLanzarModal.addEventListener('click', (e) => {
    e.preventDefault();
    contModal.classList.add('mostrar');
});

btnOcultarModal.addEventListener('click', (e) => {
    e.preventDefault();
    contModal.classList.remove('mostrar');
 });
    
 btnReload.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
 });
 