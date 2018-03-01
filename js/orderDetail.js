var allUsers=getStoredUser();
function getStoredUser(){
if(!localStorage.allUsers)
{
localStorage.allUsers=JSON.stringify([]);
}
return JSON.parse(localStorage.allUsers);
}
function storeUser(allUsers){
localStorage.allUsers=JSON.stringify(allUsers);
}
var header=[];
var details=[];
var detailId=1;
insertHeader();
insertDetails();
function insertHeader(){
for(var i=0;i<allUsers.length;i++){
if(allUsers[i].cart!==undefined){
var temp=allUsers[i];
for(var j=0;j<temp.cart.length;j++){
console.log(allUsers[i].cart);
var objectHeader=new Object();
objectHeader.email=temp.email;
objectHeader.date=temp.cart[j].date;
objectHeader.status=temp.cart[j].status;
header.push(objectHeader);
break;
}
}
}
}
function insertDetails(){
for(var i=0;i<allUsers.length;i++){
if(allUsers[i].cart!==undefined){
var temp=allUsers[i];
for(var j=0;j<temp.cart.length;j++){
var objectDetail=new Object();
objectDetail.id=detailId;
detailId++;
objectDetail.email=temp.email;
objectDetail.productName=temp.cart[j].name;
objectDetail.productQnty=temp.cart[j].qnty;
objectDetail.price=temp.cart[j].price;
details.push(objectDetail);
}
}
}
}
console.log(header);
console.log(details);
addOrderHeaderTable();
addOrderDetailsTable();

function addOrderHeaderTable(){
var myTable=document.getElementById("tableHeaderDiv");
var table=document.createElement("table");
table.border='1';
var tableBody=document.createElement('tbody');
table.appendChild(tableBody);
for(var i=-1;i<header.length;i++){
var tr=document.createElement('tr');
tableBody.appendChild(tr);
for(var j=0;j<3;j++){
var td=document.createElement('td');
td.width='75';
var node;
if(i==-1&&j==0)
node=document.createTextNode("Email");
if(i==-1&&j==1)
node=document.createTextNode("Date");
if(i==-1&&j==2)
node=document.createTextNode("status");
if(i>=0){
if(j==0)
node=document.createTextNode(header[i].email);
if(j==1)
node=document.createTextNode(header[i].date);
if(j==2)
node=document.createTextNode(header[i].status);
}
td.appendChild(node);
tr.appendChild(td);
}
}
myTable.appendChild(table);
}
function addOrderDetailsTable(){
var myTable=document.getElementById("tableDetailsDiv");
var table=document.createElement("table");
table.border='1';
var tableBody=document.createElement('tbody');
table.appendChild(tableBody);
for(var i=-1;i<details.length;i++){
var tr=document.createElement('tr');
tableBody.appendChild(tr);
for(var j=0;j<5;j++){
var td=document.createElement('td');
td.width='75';
var node;
if(i==-1&&j==0)
node=document.createTextNode("ID");
if(i==-1&&j==1)
node=document.createTextNode("Email");
if(i==-1&&j==2)
node=document.createTextNode("Item");
if(i==-1&&j==3)
node=document.createTextNode("Price");
if(i==-1&&j==4)
node=document.createTextNode("Qnty");
if(i>=0){
if(j==0)
node=document.createTextNode(details[i].id);
if(j==1)
node=document.createTextNode(details[i].email);
if(j==2)
node=document.createTextNode(details[i].productName);
if(j==3)
node=document.createTextNode(details[i].price);
if(j==4)
node=document.createTextNode(details[i].productQnty);
}
td.appendChild(node);
tr.appendChild(td);
}
}
myTable.appendChild(table);	
}
