async function doDo() {
	var a = await fetch("https://sensorapi.bumblebee13.repl.co/api/" + localStorage.getItem('sec'))
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("lpg").innerHTML = data.lpg;
			document.getElementById("co2").innerHTML = data.co2;
			document.getElementById("co").innerHTML = data.co;
			document.getElementById("smoke").innerHTML = data.smoke;
			if (parseFloat(data.co2) < 500) {
				document.getElementById("co2box").style.backgroundColor = "green";
			}
			else if (parseFloat(data.co2) < 700) {
				document.getElementById("co2box").style.backgroundColor = "yellow";
			}
			else {
				document.getElementById("co2box").style.backgroundColor = "red";
			}
			if (parseFloat(data.co) < 2) {
				document.getElementById("coBox").style.backgroundColor = "green";
			}
			else if (parseFloat(data.co) < 4) {
				document.getElementById("coBox").style.backgroundColor = "yellow";
			}
			else {
				document.getElementById("coBox").style.backgroundColor = "red";
			}
			if (parseFloat(data.lpg) < 0.2) {
				document.getElementById("lpgBox").style.backgroundColor = "green";
				document.getElementById("smokeBox").style.backgroundColor = "green";
			}
			else if (parseFloat(data.lpg) < 0.4) {
				document.getElementById("lpgBox").style.backgroundColor = "yellow";
				document.getElementById("smokeBox").style.backgroundColor = "yellow";
			}
			else {
				document.getElementById("lpgBox").style.backgroundColor = "red";
				document.getElementById("smokeBox").style.backgroundColor = "red";
			}
			return data;
		});
	if (a.status == "online") {
		document.getElementById("d1").innerHTML = "online";
		document.getElementById("d1").style.color = "green";
		document.getElementById("d2").innerHTML = "online";
		document.getElementById("d2").style.color = "green";
	}
	else {
		document.getElementById("d2").innerHTML = "offline";
		document.getElementById("d2").style.color = "red";
		document.getElementById("d1").innerHTML = "offline";
		document.getElementById("d1").style.color = "red";
	}





}


setInterval(doDo, 1000);
document.getElementById("co2box").style.color = "black";
document.getElementById("coBox").style.color = "black";
document.getElementById("lpgBox").style.color = "black";
document.getElementById("smokeBox").style.color = "black";

document.getElementById("co2box").style.fontWeight = "bold";
function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let link = window.location.href;
if (link.includes("?sec=")) {
	var sec = getParameterByName('sec');
	console.log(sec)
	localStorage.setItem('sec', sec);
	window.location.href = window.location.href.replace("?sec=" + sec, "")
}
else if (!localStorage.getItem('sec')) {
	window.location.href = window.location.href + "/login.html";
}
