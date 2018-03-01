var mainDiv=document.getElementById("ItemInCart");
var products=getStoredProducts();
var store=fetchCart();
var productDetail=new Object();
function storeItemDetail(){
	localStorage.productDetail= JSON.stringify(productDetail);
}
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

var productID=1;	//Initially productid is 1
createDOMFromArray();	//when we have stored things in browser temp storage this function will initialisze the list with stored products
function createDOMFromArray(){
	var total=0;
	for(var i=0;i<store.length;i++){	//run the loop till all the  products length
		store[i].id=productID;	//we may have some diffrenet product id in stored data we are creating DOM from scratch so 
									//we will initialisze the product id to remove unconsistencies
		addProductToDOM(store[i]);	//we will add the product  to DOM
		total+=store[i].qnty*store[i].price;
		productID++						//Incrementing the product id one by one
	}
	if(total==0){
		alert("No item in cart");
		return;
	}
	var sumDiv=document.createElement("div");
	sumDiv.setAttribute("id","sumToPayDiv");
	var sum=document.createElement("input");
	sum.setAttribute("id","sumToPay");
	sum.setAttribute("disabled","true");
	sum.value="Rs. "+total+"/-  only";
	sumDiv.appendChild(sum);
	mainDiv.appendChild(sumDiv);
}
function addBreak(target){			//when we are adding a new product we need to add break statement again and again
									// so why not make  a separate function for it
	var brk=document.createElement("br");	//creating a new break variable
	target.appendChild(brk);			//append the break variable to the passed object
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
	labelPrice.innerHTML=object.price;
	divProduct.appendChild(labelPrice);
	addBreak(divProduct);

	var showBtn=document.createElement("button");
	showBtn.innerHTML="Show Product";
	divProduct.appendChild(showBtn);

	var removeItem=document.createElement("button");
	removeItem.innerHTML="Remove From Cart";
	divProduct.appendChild(removeItem);
	//now we'll be adding add to cart mode also in


	var getQnty=document.createElement("input");
	getQnty.setAttribute("id","qntyData");
	getQnty.setAttribute("type","number");
	//console.log(object.qnty);
	getQnty.value=parseInt(object.qnty);
	divProduct.appendChild(getQnty);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	removeItem.addEventListener("click",function(event){
		var parent=event.target.parentNode;
		var name=parent.firstChild.nextSibling.innerHTML;//ACcessing the name child of our main div
		var getqnty=removeItem.nextSibling;
		var inarray=0;
		console.log(inarray);
		for(var i=0;i<store.length;i++){
			if(name===store[i].name){
				products[inarray].qnty+=store[i].qnty;
				store.splice(i,1);
				break;
			}
		}
		updateTotal();
		parent.parentNode.removeChild(parent);
		updateStore();
	});
	showBtn.addEventListener("click",function(event){
				var parent=event.target.parentNode;
				var name=parent.firstChild.nextSibling.innerHTML;
				var inarray=0;
				for(;inarray<products.length;inarray++){
					if(name===products[inarray].name)
						break;
				}
				productDetail=products[inarray];
				storeItemDetail();
				window.location.href="itemDetail.html";
	});
	mainDiv.appendChild(divProduct);		//append that div in  the main list
	storeProducts(products);		//update the cache again

}
function updateTotal(){
							var total=0;
							for(var j=0;j<store.length;j++){
								total+=store[j].qnty*store[j].price;
							}
							document.getElementById("sumToPay").value="Rs. "+total+"/-  only";
}
function searchInArray(quantity){// search that product in the array and return the position
	for(var i=0;i<products.length;i++){
		if(products[i].qnty==quantity)
				return i;
	}
}
function goToAdmin(){
	window.location.href="forAdmin.html";
}