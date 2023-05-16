var servicesStatusText = document.getElementsByClassName('serviceStatus');
var appStatusTxt = document.getElementById('app-status');
var isTurnedON = localStorage.getItem("appToggle");
if (isTurnedON == null || isTurnedON == undefined) {
    servicesStatusText.innerText = "Activated"
    console.log("Unable to find app btn status:: setting default value");
} else if (isTurnedON === "false") {
    console.log("services::" + isTurnedON);
    changeServiceStatus("Activated");
    appStatusTxt.innerText = "Activated"
} else {
    console.log("services::" + isTurnedON);
    changeServiceStatus("Deactivated");
    appStatusTxt.innerText = "Deactivated";

}

function changeServiceStatus(status) {
    for (var i = 0; i < servicesStatusText.length; i++) {
        servicesStatusText[i].innerText = status;
    }
}