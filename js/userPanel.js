//var products=[];
var products=getStoredProducts(); //The main object Array That We will be using
var productDetail=new Object();

//******************************************************
//to store the item details temporarily in the local storage when the user clicks on the show product part
function storeItemDetail(){
	localStorage.productDetail=JSON.stringify(productDetail);
}
//***********************************************************
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
function updateUserData(user){
for(var i=0;i<allUsers.length;i++){
if(allUsers[i].email==user.email){
allUsers[i]=user;
}
}
storeUser(allUsers);
}
//**************************************************************************

//*****************************************************************************
var loggedIn=false;
var userDiv=document.getElementById("userInfo");
var user=getSessionInfo();
if(user.name=='guest'){
var userLabel=document.createElement("label");
userLabel.innerHTML="Hi!!"+user.name;
userDiv.appendChild(userLabel)
loggedIn=false;
var accessLogin=document.createElement("button");
accessLogin.innerHTML="Login or Register";
accessLogin.addEventListener("click",function(){
window.location.href="main.html";
});
userDiv.appendChild(accessLogin);
}
else{
loggedIn=true;
var userLabel=document.createElement("label");
userLabel.innerHTML="Hi!!"+user.name;
userDiv.appendChild(userLabel);

var logoutBtn=document.createElement("button");
logoutBtn.innerHTML="LogOut";
logoutBtn.addEventListener("click",function(){
var object=new Object();
object.name='guest';
startUserSession(object);
location.reload();
});
userDiv.appendChild(logoutBtn);
}
function getSessionInfo(){
if(!sessionStorage.sessionUser)
{
//default to empty array
sessionStorage.sessionUser=JSON.stringify([]);
}
return JSON.parse(sessionStorage.sessionUser);
}
function startUserSession(object){
sessionStorage.sessionUser=JSON.stringify(object);
}
//****************************************************************************
// to store the items in the cart

//var store=fetchCart();
var store;
if(!user.cart)
	store=[];
else
	store=user.cart;
function fetchCart(){
	
	if (!localStorage.store)
	{
	// default to empty array
	localStorage.store = JSON.stringify([]);
	}
	return JSON.parse(localStorage.store);
} 
function updateStore(){
	localStorage.store=JSON.stringify(store);
}

//******************************************************************************
var productID=1;	//Initially productid is 1
var form=document.getElementById("formDiv");// main form div
var list=document.getElementById("list");//main list div
createDOMFromArray();	//when we have stored things in browser temp storage this function will initialisze the list with stored products
function createDOMFromArray(){
	for(var i=0;i<products.length;i++){	//run the loop till all the  products length
		products[i].id=productID;	//we may have some diffrenet product id in stored data we are creating DOM from scratch so 
									//we will initialisze the product id to remove unconsistencies
		addProductToDOM(products[i]);	//we will add the product  to DOM
		productID++						//Incrementing the product id one by one
	}
}
show();			//Just in case of debugging that data will be shown in the console


function addBreak(target){			//when we are adding a new product we need to add break statement again and again
									// so why not make  a separate function for it
	var brk=document.createElement("br");	//creating a new break variable
	target.appendChild(brk);			//append the break variable to the passed object
}

function storeProducts(products){
	localStorage.products = JSON.stringify(products);	
}

function getStoredProducts()	//fetch stored products from JSON stored to our product array pata ni kya chala hua hai isme
	{
	if (!localStorage.products)
	{
	// default to empty array
	localStorage.products = JSON.stringify([]);
	}
	return JSON.parse(localStorage.products);
}
function addProductToDOM(object){
	//Create a new DIV for this Product
	var divProduct=document.createElement("div");	//create a new div
	divProduct.setAttribute("id",productID);		//setting it's attribute to the global product id varicable

	addBreak(divProduct);							//add the break again in the div
	var labelProductName=document.createElement("label");	
	labelProductName.innerHTML=object.name;
	divProduct.appendChild(labelProductName);
	addBreak(divProduct)

	var labelDesc=document.createElement("label");
	labelDesc.innerHTML=object.desc;
	divProduct.appendChild(labelDesc);
	addBreak(divProduct);

	var labelPrice=document.createElement("label");
	labelPrice.innerHTML="Rs. "+object.price+"/- only";
	divProduct.appendChild(labelPrice);
	addBreak(divProduct);

	var showBtn=document.createElement("button");
	showBtn.innerHTML="Show Product";
	divProduct.appendChild(showBtn);
	
	//Adding the product to cart mode
	
	var addToCart=document.createElement("button");
	addToCart.innerHTML="Add to Cart";
	divProduct.appendChild(addToCart);
	
	var getQnty=document.createElement("input");
	getQnty.setAttribute("placeholder","Enter the Quantity");
	getQnty.setAttribute("id","qntyData");
	
	if(object.qnty>10)
	getQnty.setAttribute("type","number");
	else if(object.qnty<=0){
	getQnty.setAttribute("placeholder","Item Out Of Stock");
	getQnty.setAttribute("disabled","true");
	}
	else{
	getQnty.setAttribute("placeholder","Low Stock :"+object.qnty+"only");
	getQnty.setAttribute("type","number");
	}
	divProduct.appendChild(getQnty);
	
	//*********************************************************************
	addToCart.addEventListener("click",function(event){
	if(loggedIn==false){
	alert("Please Login first");
	return;
	}
	var parent=event.target.parentNode;
	var inarray=searchInArray(parseInt(parent.id));
	var getqnty=addToCart.nextSibling;
	if((parseInt(getqnty.value)>products[inarray].qnty)||parseInt(getqnty.value)<=0||(getqnty.value=="")){
					alert("Invalid Quantity");
					return;
				}else{
					var object=new Object;
					object.name=products[inarray].name;
					for(var i=0;i<store.length;i++){
						if(store[i].name===object.name){
							products[inarray].qnty=parseInt(products[inarray].qnty)+parseInt(store[i].qnty)-parseInt(getqnty.value);
							store[i].qnty=getqnty.value;
							store[i].date=assignDate();
							storeProducts(products);
							user.cart=store;
							alert("cart updated");
							updateUserData(user);
							startUserSession(user);
							//updateStore(store);
							return;
						}
					}
					object.desc=products[inarray].desc;
					object.id=products[inarray].id;
					object.price=products[inarray].price;
					object.qnty=getqnty.value;
					object.date=assignDate();
					object.status="Not Shipped";
					//console.log(assignDate);
					products[inarray].qnty=parseInt(products[inarray].qnty)-parseInt(getqnty.value);
					storeProducts(products);
					alert("Item added to Cart");
					store.push(object);	
					user.cart=store;
					updateUserData(user);
					startUserSession(user);
					updateStore(store);
				}
				
	});

	showBtn.addEventListener("click",function(event){
	var parent=event.target.parentNode;
	var inarray=searchInArray(parseInt(parent.id));
	productDetail=products[inarray];
	storeItemDetail();
	window.location.href="itemDetail.html";
	});
	list.appendChild(divProduct);		//append that div in  the main list
	storeProducts(products);		//update the cache again

}
function searchInArray(pid){// search that product in the array and return the position
	for(var i=0;i<products.length;i++){
		if(products[i].id==pid)
				return i;
	}
}

function show(){			// show the product in the console log
	for(var i=0;i<products.length;i++){
		console.log(products[i].name);
	}
}

function toGoCart(){
	window.location.href="cart.html";
}

function assignDate(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = dd + '/' + mm + '/' + yyyy;
return today;
}
	
	
