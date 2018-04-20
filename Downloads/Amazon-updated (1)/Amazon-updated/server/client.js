//We got help from W3 School and Dr James Prather
	$("#createButton").click(function(){
		var email = document.getElementById("acc_email").value;
		var uname = document.getElementById("acc_uname").value;
		var pass = document.getElementById("acc_pass").value;
		var containsSign = false;
		for (i = 0; i < email.length; i++){
			if(email[i] == '@'){
				containsSign = true;
			}
		}
		if( email != "" && uname != "" & pass != ""){
			if(containsSign){
				url = "http://localhost:8080/create/?";
				url += "email=" + document.getElementById("acc_email").value;
				url += "&uname=" + document.getElementById("acc_uname").value;
				url += "&pass=" + document.getElementById("acc_pass").value;
				$.get(url, function(data, status){
					alert("Data: " + data + "\nStatus: " + status);
				});
			}
			else{
				alert("Please enter a valid email");
			}
			
		}
		else{
			alert("Either email, username or password are null.");
		}
		
	});
	
	$("#loginButton").click(function(){
		var email = document.getElementById("log_email").value;
		var pass = document.getElementById("log_pass").value;
		if(email != "" && pass != ""){
			url = "http://localhost:8080/login/?";
			url += "email=" + email;
			url += "&pass=" + pass;
			$.get(url, function(data, status){
		        var c = data;
		        if (c.indexOf("Success") == 0) {
		            c = c.substring(8);
		            setCookie("username", c, 365);
		        }
		        location.reload();
				
			});
		}
		else{
			alert("Email or pass fields are null");
		}
		
	});
	
	//This could be the review button?
	/*
	$("#ReviewButton").click(function(){
		var email = document.getElementById("Log_email").value;
		if(email != "") {
			url = "http://localhost:8080/login/?";
			url += "email=" + email;
			$.get(url, function(data, status) {
				var c = data;
				if (c.indexOf("Success") == 0) {
					c = c.substring(8);
				}
			}
		}
	}
	*/
	$( "#acc_pass2" ).keyup(function( event ) {
		if(document.getElementById("acc_pass").value != ""){
			var arePassEqual = (document.getElementById("acc_pass").value == document.getElementById("acc_pass2").value);
			if(arePassEqual){
				document.getElementById("passEqual").innerHTML = "Passwords Match!";
			}
			else{
				document.getElementById("passEqual").innerHTML = "Passwords don't match!";
			}
 			
		}
		else{
			document.getElementById("passEqual").innerHTML = "&nbsp;";
		}
		

  });

	document.getElementById("body-wrapper").onload = checkCookie();

	function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
    }

	function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
	function deleteCookie(cname){
		document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	}

	function checkCookie() {
	    var username = getCookie("username");
	    if (username != "") {
	    	var d = new Date();
    		d.setTime(d.getTime());
	        document.getElementById("h2").innerHTML = "You have logged in, news?";
	        $("#col1").prepend("<button id = signOut onclick=return false;> Sign Out </button>");
	        $("#textBox").append("<textarea rows = 1 cols = 30 name=title id =title form=usrform placeholder = Enter&nbsp;a&nbsp;title></textarea>");
			$("#textBox").append("<textarea rows = 5 cols = 100 name=comment id =comment form=usrform placeholder = Enter&nbsp;news&nbsp;story&nbsp;here...></textarea>");
			$("#textBox").append("<button id = subButton onclick=return false;> Submit </button>");
			$("#subButton").click(function() {
				url = "http://localhost:8080/addStory/?";
				url += "title=" + document.getElementById("title").value
				url += "&text=" + document.getElementById("comment").value;
				url += "&date=" + d;
				url += "&author=" + username;
				$.get(url, function(data, status){
					alert("Data: " + data + "\nStatus: " + status);
					location.reload();
				});

			});
			$("#signOut").click(function(){
				deleteCookie("username");
				location.reload();
			});
			url = "http://localhost:8080/getStories/?";
			$.get(url, function(data, status){
				for(i = 0; i != data.length; i++){
					$("#newsStories").append("<br>"+ data[i].title + ":<br><br>" + data[i].text + " <br><br> - " + data[i].date + " Submitted By - " + data[i].author + "<br><br><br><br>" );

				}
			});

	    }
	}
