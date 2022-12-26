function setDial(aqi) {
					let angle = getAQIDialAngle(aqi);
					let [bg, white] = getAQIColor(aqi);

					let meter = document.querySelector(".gauge > div[role=meter]");
					let dial = meter.querySelector(".dial");
					meter.setAttribute("aria-valuenow", aqi);
					meter.setAttribute("aria-valuetext", aqi);
					dial.querySelector(".aqi-num").textContent = aqi;
					dial.querySelector(".arrow").style.transform = `rotate(${angle - 90}deg)`;
					dial.style.backgroundColor = bg;
					dial.classList.toggle("white", white);
				}


				function getAQIDialAngle(aqi) {
					if (aqi >= 301) {
						return Math.min((aqi - 301) / 200 * 30 + 150, 180);
					} else if (aqi >= 201) {
						return (aqi - 201) / 100 * 30 + 120;
					} else if (aqi >= 151) {
						return (aqi - 151) / 50 * 30 + 90;
					} else if (aqi >= 101) {
						return (aqi - 101) / 50 * 30 + 60;
					} else if (aqi >= 51) {
						return (aqi - 51) / 50 * 30 + 30;
					} else if (aqi >= 0) {
						return aqi / 50 * 30;
					} else {
						return 0;
					}
				}

				function getAQIColor(aqi) {
					function combineColors(c1, c2, bias) {
						return c1.map((c, i) => ((c * (1 - bias)) + (c2[i] * bias)));
					}

					function stringifyColor(c) {
						return `rgb(${c})`;
					}

					function calculateColors(c1, c2, bias) {
						let bg = combineColors(c1, c2, bias);
						let white = ((bg[0] * 299) + (bg[1] * 587) + (bg[2] * 114)) / 1000 < 128;
						return [stringifyColor(bg), white];
					}

					const aqiColorMap = [
						[0, [0, 255, 0]],
						[50, [255, 255, 0]],
						[100, [255, 126, 0]],
						[150, [255, 0, 0]],
						[200, [143, 63, 151]],
						[300, [126, 0, 35]]
					];

					for (let i in aqiColorMap) {
						let [target, color] = aqiColorMap[i];
						if (target > aqi) {
							if (i == 0) {
								return calculateColors(color, color, 1);
							}

							let [prevTarget, prevColor] = aqiColorMap[i - 1];
							return calculateColors(prevColor, color, (aqi - prevTarget) / (target - prevTarget));
						}
					}

					let [, color] = aqiColorMap[aqiColorMap.length - 1];
					return calculateColors(color, color, 1);
				}


async function doDo() {
	var a = await fetch("https://sensorapi.bumblebee13.repl.co/api/" + localStorage.getItem('sec'))
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("lpg").innerHTML = data.lpg;
			document.getElementById("co2").innerHTML = data.co2;
			document.getElementById("co").innerHTML = data.co;
			document.getElementById("smoke").innerHTML = data.smoke;
			if (parseFloat(data.co2) < 500) {
				document.getElementById("co2box").style.backgroundColor = "#0B9444";
			}
			else if (parseFloat(data.co2) < 700) {
				document.getElementById("co2box").style.backgroundColor = "#FFDE16";
			}
			else {
				document.getElementById("co2box").style.backgroundColor = "#BF1E2E";
			}
			if (parseFloat(data.co) < 2) {
				document.getElementById("coBox").style.backgroundColor = "#0B9444";
			}
			else if (parseFloat(data.co) < 4) {
				document.getElementById("coBox").style.backgroundColor = "#FFDE16";
			}
			else {
				document.getElementById("coBox").style.backgroundColor = "#BF1E2E";
			}
			if (parseFloat(data.lpg) < 0.2) {
				document.getElementById("lpgBox").style.backgroundColor = "#0B9444";
				document.getElementById("smokeBox").style.backgroundColor = "#0B9444";
			}
			else if (parseFloat(data.lpg) < 0.4) {
				document.getElementById("lpgBox").style.backgroundColor = "#FFDE16";
				document.getElementById("smokeBox").style.backgroundColor = "#FFDE16";
			}
			else {
				document.getElementById("lpgBox").style.backgroundColor = "#BF1E2E";
				document.getElementById("smokeBox").style.backgroundColor = "#BF1E2E";
			}
			return data;
		});
	if (a.status == "online") {
		document.getElementById("d1").innerHTML = "online";
		document.getElementById("d1").style.color = "#0B9444";
		document.getElementById("d2").innerHTML = "online";
		document.getElementById("d2").style.color = "#0B9444";
	}
	else {
		document.getElementById("d2").innerHTML = "offline";
		document.getElementById("d2").style.color = "#BF1E2E";
		document.getElementById("d1").innerHTML = "offline";
		document.getElementById("d1").style.color = "#BF1E2E";
	}
	setDial(a.aqi);





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
