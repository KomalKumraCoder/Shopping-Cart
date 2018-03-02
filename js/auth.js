var loginBtn=document.getElementById("Login");
var registerBtn=document.getElementById("Register");
var skipBtn=document.getElementById("Skip");
var mainDiv=document.getElementById("mainDiv");

var allUsers=getStoredUser();
var newEntry=allUsers.length;
function getStoredUser()	//fetch stored users from JSON stored to our product array
{
if (!localStorage.allUsers)
{
localStorage.allUsers = JSON.stringify([]);
}
return JSON.parse(localStorage.allUsers);
}
function storeUser(allUsers){
	localStorage.allUsers = JSON.stringify(allUsers);	
}
function startUserSession(object){
	sessionStorage.sessionUser=JSON.stringify(object);
}

loginBtn.addEventListener("click",function(){
if(mainDiv.firstChild)
mainDiv.removeChild(mainDiv.firstChild);
var loginDiv=document.createElement("div");
loginDiv.setAttribute("id","LoginDiv");

var email=document.createElement("input");
email.setAttribute("id","Email");
email.setAttribute("placeholder","Enter email or user id");
email.setAttribute("type","email");
loginDiv.appendChild(email);
addBreak(loginDiv);

var pwd=document.createElement("input");
pwd.setAttribute("id","Pwd");
pwd.setAttribute("placeholder","Enter the password");
pwd.setAttribute("type","password");
loginDiv.appendChild(pwd);
addBreak(loginDiv);

var submit=document.createElement("button");
submit.setAttribute("id","subBtn");
submit.innerHTML="Submit";
loginDiv.appendChild(submit);

submit.addEventListener("click",function(){
if(email.value==''||pwd.value==''){
alert("Field is Empty!!Please Check");
}
for(var i=0;i<allUsers.length;i++){
if(email.value==allUsers[i].email){
if(pwd.value==allUsers[i].pwd){
alert("Successfully Logged in");
startUserSession(allUsers[i]);
if(parseInt(allUsers[i].role)==1){
alert("Welcome Admin");
window.location.href="temp.html";
}
else{
window.location.href="userPanel.html";
}
}else{
alert("Wrong password");
return;
}
}
else if(pwd.value==allUsers[i].pwd){
if(email.value==allUsers[i].email){
alert("Logged In");
startUserSession(allUsers[i]);
window.location.href="userPanel.html";
}else{
alert("Wrong Email id");
return;
}
}
}
});
mainDiv.appendChild(loginDiv);
});
function alreadyThere(userEmail){
for(var i=0;i<allUsers.length;i++){
if(userEmail==allUsers[i].email){
return true;
}
}
return false;
}
function addBreak(object){
	var br=document.createElement("br");
	object.appendChild(br);
}
function checkValidPassword(pwd){
var capital=false;
var special=false;
var small=false;
var integer=false;
for(var i=0;i<pwd.length;i++){
if(pwd[i]>='A'&&pwd[i]<='Z')
capital=true;
if(pwd[i]=='@'||pwd[i]=='#'||pwd[i]=='$')
special=true;
if(pwd[i]>='a'&&pwd[i]<='z')
small=true;
if(parseInt(pwd[i])>=0&&parseInt(pwd[i])<=9)
integer=true;
	}
if(capital==true&&special==true&&small==true&&integer==true&&pwd.length>=5)
	return true;
	return false;
}
registerBtn.addEventListener("click",function(){
	if(mainDiv.firstChild)
	mainDiv.removeChild(mainDiv.firstChild);
	console.log("hey");
	var registerDiv=document.createElement("div");
	registerDiv.setAttribute("id","tempRegisterDiv");

	var name=document.createElement("input");
	name.setAttribute("id","registerName");
	name.setAttribute("placeholder","Enter Name");
	name.setAttribute("type","text");
	registerDiv.appendChild(name);
	addBreak(registerDiv);
	
	var email=document.createElement("input");
	email.setAttribute("id","registerEmail");
	email.setAttribute("placeholder","Enter email to register");
	email.setAttribute("type","email");
	registerDiv.appendChild(email);
	addBreak(registerDiv);
	
	var pwd=document.createElement("input");
	pwd.setAttribute("id","pwd");
	pwd.setAttribute("placeholder","Enter password");
	pwd.setAttribute("type","password");
	registerDiv.appendChild(pwd);
	addBreak(registerDiv);

	var confirmPwd=document.createElement("input");
	confirmPwd.setAttribute("id","confirmPwd");
	confirmPwd.setAttribute("placeholder","Enter password");
	confirmPwd.setAttribute("type","password");
	registerDiv.appendChild(confirmPwd);
	addBreak(registerDiv);

	var adminOrUser=document.createElement("input");
	adminOrUser.setAttribute("placeholder","1 for Admin 2 for User");
	adminOrUser.setAttribute("type","number");
	adminOrUser.setAttribute("id","userRole");
	registerDiv.appendChild(adminOrUser);
	addBreak(registerDiv);

	var submit=document.createElement("button");
	submit.setAttribute("id","subBtn");
	submit.innerHTML="Submit";
	registerDiv.appendChild(submit);
	submit.addEventListener("click",function(){
		if(name.value==''||email.value==''||pwd.value==''||confirmPwd.value==''||adminOrUser.value==''){
			alert("fields Empty");
			return;
		}
		if((checkValidPassword(pwd.value)==false)){
			alert("password not valid");
			return;
		}
		if(pwd.value!==confirmPwd.value){
			alert("Passwords did not match");
			return;
		}
		if(alreadyThere(email.value)==true){
			alert("This Email has already been registered");
			return;
		}
		var object=new Object();
		object.name=name.value;
		object.email=email.value;
		object.pwd=pwd.value;
		object.cart=[];
	//	object.OrderID=OrderID;
	//	OrderID++;
		object.role=adminOrUser.value;
		allUsers[newEntry++]=object;
		storeUser(allUsers);
		alert("User Successfully registerd !! Please login again");
		mainDiv.removeChild(registerDiv);

	});
	mainDiv.appendChild(registerDiv);
});

skipBtn.addEventListener("click",function(){
var object=new Object();
object.name="guest";
startUserSession(object);
window.location.href="userPanel.html";
});
