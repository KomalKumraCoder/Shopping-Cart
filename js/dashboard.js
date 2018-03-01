var mainDiv=document.getElementById("mainDiv");
var footDiv=document.getElementById("footDiv");
var sideDiv=document.getElementById("sideDiv");
var target=document.getElementById("target");

init();
function addBreak(given){
	var br=document.createElement("br");
	given.appendChild(given);
}
function changeURL(link){
	target.src=link;
}
function init(){
	var userBtn=document.createElement("button");
	userBtn.innerHTML="Authentication";
	
	var productsBtn=document.createElement("button");
	productsBtn.innerHTML="List Of Products";

	var ordersBtn=document.createElement("button");
	ordersBtn.innerHTML="View Orders";
	
	var cartBtn=document.createElement("button");
	cartBtn.innerHTML="View Cart";
	
	sideDiv.appendChild(userBtn);
	//addBreak(sideDiv);
	sideDiv.appendChild(productsBtn);
	//addBreak(sideDiv);
	sideDiv.appendChild(ordersBtn);
    //addBreak(sideDiv);
	sideDiv.appendChild(cartBtn);
	
	cartBtn.addEventListener("click",function(){
		changeURL("cart.html");
	});
	userBtn.addEventListener("click",function(){
	changeURL("auth.html");
	});
	
	ordersBtn.addEventListener("click",function(){
		changeURL("forAdmin.html");
	});
	productsBtn.addEventListener("click",function(){
		changeURL("userPanel.html");
	});
}