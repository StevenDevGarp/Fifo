const form = document.getElementById("miForm");
const btnProcesar = document.querySelector('#procesar');
const tableData = document.getElementById("dataSort");
const promEspera = document.getElementById("espera");
const promRetorno = document.getElementById("retorno");
let ArrayId = [];
let ArrayCPU = [];
let ArrayTiempo = [];
let completado = [];
let retorno = [];
let espera = [];
let sumaEs = 0;
let sumaRe = 0;
let promedioEs = 0;
let promedioRe = 0;


form.addEventListener("submit", function(event){
    event.preventDefault();
    let transactionFormData = new FormData(form);
    let transactiontableRef = document.getElementById("transactionTable");
    let newTransactionRowRef = transactiontableRef.insertRow(-1);

    let newTransactionCellRef = newTransactionRowRef.insertCell(0);
    newTransactionCellRef.textContent = transactionFormData.get("proceso");
    ArrayId.push(transactionFormData.get("proceso"));

    newTransactionCellRef = newTransactionRowRef.insertCell(1);
    newTransactionCellRef.textContent = transactionFormData.get("CPU");
    ArrayCPU.push(transactionFormData.get("CPU"));

    newTransactionCellRef = newTransactionRowRef.insertCell(2);
    newTransactionCellRef.textContent = transactionFormData.get("Tiempo");
    ArrayTiempo.push(transactionFormData.get("Tiempo"));
});

document.addEventListener('DOMContentLoaded', function(event){
    event.preventDefault();
    form.addEventListener('submit', function() {
      form.reset();
    });
  });

function ordenar (){
  let temp;
  for (let i = 0; i < ArrayId.length; i++) {
      for (let j = 0; j < ArrayId.length - (i + 1); j++) {
          if (ArrayTiempo[j] > ArrayTiempo[j + 1]) {
            //mueve las pociciones de llegada
            temp = ArrayTiempo[j];
            ArrayTiempo[j] = ArrayTiempo[j + 1];
            ArrayTiempo[j + 1] = temp;
            
            //mueve las pociciones de rafaga
            temp = ArrayCPU[j];
            ArrayCPU[j] = ArrayCPU[j + 1];
            ArrayCPU[j + 1] = temp;
            
            //mueve los id de los procesos
            temp = ArrayId[j];
            ArrayId[j] = ArrayId[j + 1];
            ArrayId[j + 1] = temp;
          }
      }
  }
};

function tiempoFinalizacion(){
  for (let i = 0; i < ArrayId.length; i++) {
      if (i == 0) {
          completado[i] = parseInt(ArrayTiempo[i]) + parseInt(ArrayCPU[i]);
      } else {
          if (parseInt(ArrayTiempo[i]) > completado[i - 1]) {
              completado[i] = parseInt(ArrayTiempo[i]) + parseInt(ArrayCPU[i]);
            } else {
              completado[i] = completado[i - 1] + parseInt(ArrayCPU[i]);
            }
      }
      retorno[i] = completado[i] - ArrayTiempo[i];
      espera[i] = retorno[i] - ArrayCPU[i];         
    }
    for(let n of espera){
      sumaEs += n;
    }
    for(let n of retorno){
      sumaRe +=n;
    }              
    promedioEs = sumaEs/ArrayId.length;
    promedioRe = sumaRe/ArrayId.length;
  };
function tablaProceso (){
  for (let i = 0; i < ArrayId.length; i++){
  
    let newTableRowRef = tableData.insertRow(-1);
    let newTableCellRef = newTableRowRef.insertCell(0);
    newTableCellRef.textContent = ArrayId[i];

    newTableCellRef = newTableRowRef.insertCell(1);
    newTableCellRef.textContent = ArrayCPU[i];

    newTableCellRef = newTableRowRef.insertCell(2);
    newTableCellRef.textContent = ArrayTiempo[i];

    newTableCellRef = newTableRowRef.insertCell(3);
    newTableCellRef.textContent = espera[i];
    
    newTableCellRef = newTableRowRef.insertCell(4);
    newTableCellRef.textContent = completado[i];
    }
};
btnProcesar.addEventListener('click', (e) => {
  e.preventDefault();
  ordenar();
  console.log(ArrayId);
  console.log(ArrayCPU);
  console.log(ArrayTiempo);
  tiempoFinalizacion();
  tablaProceso();
  promEspera.textContent = promedioEs;
  promRetorno.textContent = promedioRe;
});

