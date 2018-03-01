//var products=[];
var products=getStoredProducts(); //The main object Array That We will be using
var productDetail=new Object();

//******************************************************
//to store the item details temporarily in the local storage when the user clicks on the show product part
function storeItemDetail(){
	localStorage.productDetail=JSON.stringify(productDetail);
}
//***********************************************************

//*************************************************************
//to store the item in cart

var store=fetchCart();
function fetchCart(){
	if(!localStorage.store)
	{
		//default to empty Array
		localStorage.store=JSON.stringify([]);
	}
	return JSON.parse(localStorage.store);
}
function updateStore(){
	localStorage.store=JSON.stringify(store);
}
//************************************************************
var productID=1;      //Initially product id is 1
var addorEditProduct=document.getElementById("addtheProduct");
var form=document.getElementById("formDiv");
var list=document.getElementById("list");
createDOMFromArray(); //when we have stored things in browser temp storage this function will initialise the list with stored products
function createDOMFromArray(){
	for(var i=0;i<products.length;i++){ //run loop till all the products array length
		products[i].id=productID;       //we may have some different product id in stored data we are creating DOM from scratch so
		                                //we will initialise the product id to remove unconsistencies
		addProductToDOM(products[i]);
        productID++;		
	}
}
show();
addorEditProduct.addEventListener("click",function(event){
	hideLink();
	createPanel(null); //when we are creating a new product and not from storage we will call this function by passing null
});
function hideLink(){
	addorEditProduct.setAttribute("style","display:none");//hiding the href link by setting its attribute
}

function showLink(){
	addorEditProduct.setAttribute("style","display:block");//when we are done by adding the product we are done by addind a product just show the link
}

//********Create Blank Space**************
function addBreak(target){               
var brk=document.createElement("br");     //creating a new blank variable 
target.appendChild(brk);                 //append the break variable to the passed object

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


//************Add Product to array*******
function addProductToArray(){
	
	var object=new Object();
	object.id=productID;
	object.name=document.getElementById("idProductName").value;
	object.desc=document.getElementById("idProductDesc").value;
	object.price=document.getElementById("idProductPrice").value;
	object.qnty=document.getElementById("idProductQnty").value;
	products.push(object);
	
	addProductToDOM(object);//now the product is added
	deleteThePanel();
	productID++;	
}

//*****Add Product To DOM*******************

function addProductToDOM(object){
	console.log("Hi");
	var divProduct=document.createElement("div");//creating new div
	divProduct.setAttribute("id",productID);     //setting its attribute to global product id variable
    addBreak(divProduct);

var labelProductName=document.createElement("label");
labelProductName.innerHTML=object.name;
divProduct.appendChild(labelProductName);
addBreak(divProduct);

var labelProductDesc=document.createElement("label");
labelProductDesc.innerHTML=object.desc;
divProduct.appendChild(labelProductDesc);
addBreak(divProduct);

var labelProductPrice=document.createElement("label");
labelProductPrice.innerHTML="Rs. "+object.price+"/- only";
divProduct.appendChild(labelProductPrice);
addBreak(divProduct);

var deleteBtn=document.createElement("button");
deleteBtn.innerHTML="Delete";
divProduct.appendChild(deleteBtn);

var editBtn=document.createElement("button");
editBtn.innerHTML="Edit";
divProduct.appendChild(editBtn);

var showBtn=document.createElement("button");
showBtn.innerHTML="Show Product Details";
divProduct.appendChild(showBtn);
	
//*************************Button Functioning*********************

showBtn.addEventListener("click",function(event){
 var parent=event.target.parentNode;
 var inarray=searchInArray(parseInt(parent.id));
 productDetail=products[inarray];
 storeItemDetail();
 window.location.href="itemDetail.html"; 
	
});

deleteBtn.addEventListener("click",function(event){
	var grandParent=event.target.parentNode.parentNode; //parent of the delete btn(event.target) that div(event.target.parentNode)
	                                                   //parent of outer div(event.target.parent.parent)
	var parent=event.target.parentNode;      //parent of the delete button
	var inarray=searchInArray(parseInt(parent.id)); //convert from string to int first and then search that index
    deleteFromArray(inarray);                 //delete that particular index from the main product array
	grandParent.removeChild(parent);          //delete the div from the dom as well
	storeProducts(products);
}); 


editBtn.addEventListener("click",function(event){
		hideLink();										//Again hide the link first
		var grandParent=event.target.parentNode.parentNode;	//grandparent of that edit/delete btn
				var parent=event.target.parentNode;			//parent div of edit/delete btn
				var inarray=searchInArray(parseInt(parent.id));	//search the array in the parent array
				var ob=products[inarray];			//get the object data from the array
				deleteFromArray(inarray);			//first delete the product from the array
				grandParent.removeChild(parent);		//delete that product from the DOM too
				createPanel(ob);				//Now create the form again prefilled with the object data
				storeProducts(products);		//update the cache again
	});

list.appendChild(divProduct);	 //append div to main list
storeProducts(products);	
}

//*****Search Element in Array********
function searchInArray(pid) //search product in array and return the position
{
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
function clearDOM(){		//clear the DOM for the moment
	var ChildNodes=list.childNodes;
	for(var i=0;ChildNodes.length>0;)
		list.removeChild(ChildNodes[i]);
}

//****Delete the panel************
function deleteThePanel(){
	var ChildNodes=form.childNodes;
	for(var i=0;ChildNodes.length>0;){
		form.removeChild(ChildNodes[i]);
	}
}


//********Delete A Particular Product From Array*********
function deleteFromArray(index){
	products.splice(index,1);
    console.log(products);
}

//****Create the Form in Div*******************
function createPanel(object){ 

//Lets create a Form Panel which is not a form

var Heading=document.createElement("label");
    if(object==null)
	   Heading.innerHTML="Add New Product";
    else
	   Heading.innerHTML="Modify The Details";
form.appendChild(Heading);

addBreak(form);
addBreak(form);

var productName=document.createElement("input");
productName.setAttribute("placeholder","Enter Product Name");
productName.setAttribute("type","text");
productName.setAttribute("id","idProductName");

if(object!=null)
	productName.defaultValue=object.name;

form.appendChild(productName);

addBreak(form);
addBreak(form);

var productDesc=document.createElement("textarea");
productDesc.setAttribute("placeholder","Enter the Product Description");
productDesc.setAttribute("type","text");
productDesc.setAttribute("id","idProductDesc");

if(object!=null)
	productDesc.defaultValue=object.desc;

form.appendChild(productDesc);

addBreak(form);
addBreak(form);

var productPrice=document.createElement("input");
productPrice.setAttribute("placeholder","Enter the Product Price");
productPrice.setAttribute("type","number");
productPrice.setAttribute("id","idProductPrice");

if(object!=null)
	productPrice.defaultValue=object.price;

form.appendChild(productPrice);

addBreak(form);
addBreak(form);

var productQnty=document.createElement("input");
productQnty.setAttribute("placeholder","Enter the Product Quantity");
productQnty.setAttribute("type","number");
productQnty.setAttribute("id","idProductQnty");

if(object!=null)
	productQnty.defaultValue=object.qnty;

form.appendChild(productQnty);

addBreak(form);
addBreak(form);

var submitBtn=document.createElement("button");
submitBtn.innerHTML="Submit the form";
submitBtn.setAttribute("id","addToTheList");

form.appendChild(submitBtn);

addBreak(form);
addBreak(form);

submitBtn.addEventListener("click",function(event){
//if any field is empty form will be invalidated
if(productName.value==""||productDesc.value==""||productPrice.value==""||productQnty.value==""){
alert("Some Field Is Empty");
return false;
}	
    //if all fields are filled save data
     addProductToArray();
     showLink();		
});


}

function toGoCart(){
	window.location.href="userPanel.html";
}