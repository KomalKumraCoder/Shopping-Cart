var productDetail=getStoredProducts();
var allDetails=document.getElementById("details");
function storeProducts(productDetail){
	localStorage.productDetail = JSON.stringify(productDetail);	
}
var userDiv=document.getElementById("userInfo");
var user=getSessionInfo();
var userLabel=document.createElement("label");
userLabel.innerHTML="Hi!! "+user.name;

function getSessionInfo(){
	
	if (!sessionStorage.sessionUser)
	{
	// default to empty array
	sessionStorage.sessionUser = JSON.stringify([]);
	}
	return JSON.parse(sessionStorage.sessionUser);
}

userDiv.appendChild(userLabel);


function getStoredProducts()	//fetch stored products from JSON stored to our product array pata ni kya chala hua hai isme
	{
	if (!localStorage.productDetail)
	{
	// default to empty array
	localStorage.productDetail = JSON.stringify([]);
	}
	return JSON.parse(localStorage.productDetail);
}
letsMakeIt();
function addBreak(variable){
	var bre=document.createElement("br");
	variable.appendChild(bre);
}
function letsMakeIt(){
	var productName=document.createElement("label");
	productName.setAttribute("style","align-content:center");
	productName.innerHTML="Product Name : "+productDetail.name;

	var productPrice=document.createElement("label");
	productPrice.innerHTML="Product Price : Rs. "+productDetail.price+"/- only";

	var productQnty=document.createElement("label");
	if(parseInt(productDetail.qnty)==0)
		productQnty.innerHTML="Out of Stock";
	else if(parseInt(productDetail.qnty)<10)
		productQnty.innerHTML="Low Stocks Hurry : "+productDetail.qnty;
	else
		productQnty.innerHTML="In Stock";


	var productDesc=document.createElement("label");
	productDesc.innerHTML="Product Description : "+productDetail.desc;

	//let's append all the childs
	allDetails.appendChild(productName);
	addBreak(allDetails);
	allDetails.appendChild(productPrice);
	addBreak(allDetails);
	allDetails.appendChild(productQnty);
	addBreak(allDetails);
	allDetails.appendChild(productDesc);
}