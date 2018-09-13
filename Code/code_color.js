var urlBase = 'http://canisleepnow.com/LAMPAPI';
var extension = "php";

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;

	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );

		userId = jsonObject.id;

		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		document.getElementById("userName").innerHTML = firstName + " " + lastName;

		document.getElementById("loginName").value = "";
		document.getElementById("loginPassword").value = "";

		hideOrShow( "loggedInDiv", true);
		hideOrShow( "accessUIDiv", true);
		hideOrShow( "loginDiv", false);
		hideOrShow( "newUser", false);
		hideOrShow( "newContact", false);
		hideOrShow( "deleteContact", false);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";

	//making Variables blank again
	document.getElementById("Password").value = "";
	document.getElementById("Username").value = "";
	document.getElementById("existingPhone").value = "";
	document.getElementById("firstNameNewContact").value = "";
	document.getElementById("lastNameNewContact").value = "";
	document.getElementById("phone").value = "";
	document.getElementById("zip").value = "";
	document.getElementById("email").value = "";
	document.getElementById("searchText").value = "";
	document.getElementById("contactSearchResult").innerHTML = "";
	document.getElementById("contactList").innerHTML = "";
	document.getElementById("deleteContactResult").innerHTML = "";
	document.getElementById("newContactResult").innerHTML = "";

	//changing the page options

	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", true);
	hideOrShow( "newUser", false);
	hideOrShow( "newContact", false);
	hideOrShow( "deleteContact", false);
}

//Begin Edit

function doBack()
{
	//making Variables blank again
	document.getElementById("Password").value = "";
	document.getElementById("Username").value = "";
	document.getElementById("existingPhone").value = "";
	document.getElementById("firstNameNewContact").value = "";
	document.getElementById("lastNameNewContact").value = "";
	document.getElementById("phone").value = "";
	document.getElementById("zip").value = "";
	document.getElementById("email").value = "";
	document.getElementById("searchText").value = "";
	document.getElementById("contactSearchResult").innerHTML = "";
	document.getElementById("contactList").innerHTML = "";
	document.getElementById("deleteContactResult").innerHTML = "";
	document.getElementById("newContactResult").innerHTML = "";

	//changing the page options

	//changing the page options
	hideOrShow( "loginDiv", false);
	hideOrShow( "newUser", false);
	hideOrShow( "loggedInDiv", true);
	hideOrShow( "accessUIDiv", true);
	hideOrShow( "newContact", false);
	hideOrShow( "deleteContact", false);
}

//New User Page
function doNewUserPage()
{
	//making Variables blank again
	document.getElementById("Password").value = "";
	document.getElementById("Username").value = "";
	document.getElementById("existingPhone").value = "";
	document.getElementById("firstNameNewContact").value = "";
	document.getElementById("lastNameNewContact").value = "";
	document.getElementById("phone").value = "";
	document.getElementById("zip").value = "";
	document.getElementById("email").value = "";
	document.getElementById("searchText").value = "";

	//changing the page options
	hideOrShow( "loginDiv", false);
	hideOrShow( "newUser", true);
	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "newContact", false);
	hideOrShow( "deleteContact", false);
}

//New Contact Page
function doNewContactPage()
{
	//making Variables blank again
	document.getElementById("Password").value = "";
	document.getElementById("Username").value = "";
	document.getElementById("existingPhone").value = "";
	document.getElementById("firstNameNewContact").value = "";
	document.getElementById("lastNameNewContact").value = "";
	document.getElementById("phone").value = "";
	document.getElementById("zip").value = "";
	document.getElementById("email").value = "";
	document.getElementById("searchText").value = "";

	//changing the page options
	hideOrShow( "loginDiv", false);
	hideOrShow( "newUser", false);
	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "newContact", true);
	hideOrShow( "deleteContact", false);
}

//Delete Contact Page
function doDeleteContactPage()
{
	//making Variables blank again
	document.getElementById("Password").value = "";
	document.getElementById("Username").value = "";
	document.getElementById("existingPhone").value = "";
	document.getElementById("firstNameNewContact").value = "";
	document.getElementById("lastNameNewContact").value = "";
	document.getElementById("phone").value = "";
	document.getElementById("zip").value = "";
	document.getElementById("email").value = "";
	document.getElementById("searchText").value = "";

	//changing the page options
	hideOrShow( "loginDiv", false);
	hideOrShow( "newUser", false);
	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "newContact", false);
	hideOrShow( "deleteContact", true);
}

// Create A New User
function doNewUser()
{
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var Username = document.getElementById("Username").value;
	var Password = document.getElementById("Password").value;
	var RePassword = document.getElementById("ConfirmPassword").value;
	document.getElementById("userResult").innerHTML = "";
	document.getElementById("PasswordError").innerHTML = "";

	if(Password != RePassword){
			document.getElementById("PasswordError").innerHTML = "***Passwords Do Not Match. Please Try Again.***";
			document.getElementById("firstName").value = "";
			document.getElementById("lastName").value = "";
			document.getElementById("Username").value = "";
			document.getElementById("Password").value = "";
			document.getElementById("ConfirmPassword").value = "";
	}
	else{
			var jsonPayload = '{"firstName" : "' + firstName + '","lastName" : "' + lastName + '","Username" : "' + Username + '","Password" : "' + Password + '", "userId" : ' + userId + '}';
			var url = urlBase + '/NewUser.' + extension;

			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
			try
			{
				xhr.onreadystatechange = function()
				{
					if (this.readyState == 4 && this.status == 200)
					{
						document.getElementById("userResult").innerHTML = "New User has been added";
					}
				};
				xhr.send(jsonPayload);
			}
			catch(err)
			{
				document.getElementById("userResult").innerHTML = err.message;
			}
	}
}

// Create a new Contact
function doNewContact()
{
	var firstName = document.getElementById("firstNameNewContact").value;
	var lastName = document.getElementById("lastNameNewContact").value;
	var phone = document.getElementById("phone").value;
	var zip = document.getElementById("zip").value;
	var email = document.getElementById("email").value;
	document.getElementById("newContactResult").innerHTML = "";

	var jsonPayload = '{"firstName" : "' + firstName + '","lastName" : "' + lastName + '","phone" : "' + phone + '","zip" : "' + zip + '","email" : "' + email + '", "userId" : ' + userId + '}';
	var url = urlBase + '/NewContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("newContactResult").innerHTML = "New Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("newContactResult").innerHTML = err.message;
	}
}

// Delete Contact
function doDeleteContact()
{
	var phone = document.getElementById("existingPhone").value;
	document.getElementById("deleteContactResult").innerHTML = "";

	var jsonPayload = '{"phone" : "' + phone+ '", "userId" : ' + userId + '}';
	var url = urlBase + '/deleteContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("deleteContactResult").innerHTML = "Contact has been deleted: " + phone;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("deleteContactResult").innerHTML = err.message;
	}
}
//End Edit

function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}

function addColor()
{
	var newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	var jsonPayload = '{"color" : "' + newColor + '", "userId" : ' + userId + '}';
	var url = urlBase + '/AddColor.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}

}

function searchContact()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";

	var contactList = document.getElementById("contactList");
	contactList.innerHTML = "";

	// This is the dropdown option chosen by the user (Note that nothing has been added into list at this point)
	// var strUser = contactList.options[contactList.selectedIndex].text; 


	var jsonPayload = '{"search" : "' + srch + '", "contactList" : "' + contactList + '", "userId" : ' + userId + '}';
	var url = urlBase + '/SearchContacts.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				hideOrShow( "contactList", true );

				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved! (Last Name, First Name - Phone - Email - Zip)";
				var jsonObject = JSON.parse( xhr.responseText );

				var i;
				for( i=0; i<jsonObject.results.length; i++ )
				{
					var opt = document.createElement("option");
					opt.text = jsonObject.results[i];
					opt.value = "i + 1";
					contactList.options.add(opt);
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}

function showContactInfo()
{
	var contactList = document.getElementById("contactList");
	var strUser = contactList.options[contactList.selectedIndex]; // This is the dropdown option chosen by the user 
	
	var jsonPayload = '{"searchOption" : "' + strUser + '"}';
	
}

function contactList()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";

	var contactList = document.getElementById("contactList");
	contactList.innerHTML = "";

	var jsonPayload = '{"search" : "' + srch + '", "contactList" : "' + contactList + '", "userId" : ' + userId + '}';
	var url = urlBase + '/contactList.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}