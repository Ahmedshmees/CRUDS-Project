let title = document.getElementById('title');
let price  = document.getElementById("price");
let taxes =  document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount =  document.getElementById("discount");
let total =  document.getElementById("total") ;
let count =  document.getElementById("count") ;
let category =  document.getElementById("category") ;
let submit =  document.getElementById("submit");
let tbody = document.getElementById("tbody");
let deleteall = document.getElementById("deleteAll");
let statu = "create";
let index ;

// calcToatal 
function calcTotal() {
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result ; 
        total.style.backgroundColor= "green";
    }
    else {
        total.style.backgroundColor= "#b52424";
        total.innerHTML ="" ;
    }
}

// Create
let proData=[];
if(localStorage.product != null)
{
    proData = JSON.parse(localStorage.product);
}else {
    proData = [];
}


submit.onclick =function() {
    let newpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    };
    
    localStorage.product = JSON.stringify(proData);
   // count  
   if (title.value != '' && price.value != '' &&category.value !='' &&  count.value < 100) {
    if (statu === 'create') {
        if(count.value > 1) {
            for(let i = 0 ; i < count.value; i++)
            {
                proData.push(newpro);
            }
        }
        else {
            proData.push(newpro);
            
        }
       }
       else 
       {
            proData[index] = newpro;
            statu =  "create";
            count.style.display="block";
            submit.innerHTML ="Create";
       }
       clearData();
   } 
   else {
    alert("Please fill all fields");
   }

    
    showData();
}

// clear Data
function clearData(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    count.value ='';
    category.value ='';
    total.innerHTML='';
}

// show Data
function showData(){
    calcTotal();
    let table = '';     
    for(let i = 0 ; i < proData.length ; i++)
    {
        table += `
        <tr>
        <td>${[i +1]}</td>
        <td>${proData[i].title}</td>
        <td>${proData[i].price}</td>
        <td>${proData[i].taxes}</td>
        <td>${proData[i].ads}</td>
        <td>${proData[i].discount}</td>
        <td>${proData[i].count}</td>
        <td>${proData[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }
    tbody.innerHTML=table;
    
    if(proData.length  > 0)
    {
        deleteall.innerHTML=`<button onclick="clearAll()"> Clear All ${proData.length} </button>`;
    }
    else {
        deleteall.innerHTML='';
    }
}
showData();

// delete product 
function  deleteProduct(i)
{
    proData.splice(i,1);
    localStorage.product = JSON.stringify(proData);
    showData();
}

// clear all data
function clearAll() {
    localStorage.clear();
    proData.slice(0);
    showData();
    location.reload();  
}


// update product
function updateData(i){
    title.value = proData[i].title;
    price.value = proData[i].price;
    taxes.value = proData[i].taxes;
    discount.value = proData[i].discount;
    ads.value = proData[i].ads;
    category.value =  proData[i].category;
    count.value = 1;
    calcTotal();
    statu = 'update';
    count.style.display ="none";
    submit.innerHTML = 'Update';
    index = i;
    scrollTo({
        top:0,
        behavior:'smooth',
    })
        showData();
}