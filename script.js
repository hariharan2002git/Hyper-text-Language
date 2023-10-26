const balance = document.querySelector("#balance");
const income = document.querySelector("#incomenum");
const expense = document.querySelector("#expensenum");
const incomeinput = document.querySelector("#incomeinput");
const expenseinput = document.querySelector("#expenseinput");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");

const dummydata =[
  {id:1,description:"flower",amount:-45},
  {id:2,description:"salary",amount:45000},
  {id:3,description:"rent",amount:-4500},
  {id:4,description:"side income",amount:20000},
  {id:5,description:"petrol",amount:-1000},
];


// let transactions =dummydata;

const localstoragetrans =JSON.parse(localStorage.getItem("trans"));

let transactions = localStorage.getItem("trans")!==null?localstoragetrans:[];

window.addEventListener('load',function(){
    config()
});

function config(){
    trans.innerHTML=""
    transactions.forEach(loadTransactionDetails);
    updateamount()
}

function loadTransactionDetails (transactions){
    const sign = transactions.amount<0?'-':'+';

    const item = document.createElement('li');
   
    item.classList.add(transactions.amount<0?'exp':'inc')
     item.innerHTML=`
     ${transactions.description} 
    <span> ${sign} ${Math.abs(transactions.amount)} </span>
    <button class="btn-del" onclick="removetrans(${transactions.id})">z</button>
     `

    trans.appendChild(item)
}

function removetrans(id){
    if(confirm("are you sure ")){
        transactions = transactions.filter((transactions)=> transactions.id!=id);
        config()
    }else{
        return
    }
    updatelocalstorage()
}


function updateamount(){
    const amounts = transactions.map((transactions) =>
    transactions.amount);

    const total = amounts.reduce((acc,item) => (acc+=item),0).toFixed(2)
    
    balance.innerHTML=`${total}`


    const income = amounts
    .filter((item) => item>0)
    .reduce((acc,item) => (acc+=item),0)
    .toFixed(2)
    
    incomenum.innerHTML=`${income}`

    const expense = amounts
    .filter((item) =>item<0 )
    .reduce((acc,item)=>(acc+=item),0)
    expensenum.innerHTML=`${expense}`

    updatelocalstorage()

  
  
}
function addtransaction(e){
    e.preventDefault()


if(description.value.trim()==" " || amount.value.trim()==" "){
   alert("enter the both");
}else{
    const transaction = {
        id:uniqueid(),
        description:description.value,
        amount:+ amount.value
        
        
    }
  }
    



transactions.push(transactions)
loadTransactionDetails(transactions)

description.value =" ";
amount.value="";
updateamount();
updatelocalstorage()
}

//localstorage


  
form.addEventListener("submit",addtransaction);

function updatelocalstorage(){
    localStorage.setItem("trans",JSON.stringify(transactions))
}

function uniqueid(){
    return Math.floor(Math.random()*10000)
} 