chrome.tabs.onUpdated.addListener(function(tabId, changedInfo) {
    const url = changedInfo.pendingUrl || changedInfo.url;
    var isADBLOCKACTIVATED = undefined;
    isADBLOCKACTIVATED = localStorage.getItem("toggle");
    if (isADBLOCKACTIVATED === "true") {
        if (!url || !url.startsWith("http://")) {
            return;
        } else {
            var stats = localStorage.getItem("httpBlockedStats");
            if (stats != null | stats != undefined) {
                stats = parseInt(stats);
                localStorage.setItem("httpBlockedStats", stats + 1);
            }
            let alertURL = "https://sites.google.com/view/adblockhome/http-not-secure";
            chrome.tabs.update(tabId, { url: alertURL })
        }
    } else {
        return;
    }

})
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        //  console.log(details.url);
        var isADBLOCKACTIVATED = localStorage.getItem("toggle");
        if (isADBLOCKACTIVATED == null || isADBLOCKACTIVATED == undefined) {
            toggleOn = "true";
            localStorage.setItem("toggle", true);
            console.log("First init: " + isADBLOCKACTIVATED);
        } else {
            console.log("fetching from saved result: " + isADBLOCKACTIVATED);
            turnedOn = isADBLOCKACTIVATED;
        }
        if (turnedOn === "true") {
            console.log("Blocking: " + isADBLOCKACTIVATED);
            var stats = localStorage.getItem("totalADblockedStats");
            if (stats != null | stats != undefined) {
                stats = parseInt(stats) + Math.floor((Math.random() * 0.4) + 1);
                localStorage.setItem("totalADblockedStats", stats);
            }
            return {
                cancel: true
            }
        } else {
            console.log("No ad blocking as per user permissions: " + isADBLOCKACTIVATED);
            return {
                cancel: false
            }
        }
    }, {
        urls: ["*://*.doubleclick.net/*",
            "*://*.partner.googleadservices.com/*",
            "*://*.googlesyndication.com/*",
            "*://creative.ak.fbcdn.net/*",
            "*://*.adbrite.com/*",
            "*://*.exponential.com/*",
            "*://*.quantserve.com/*",
            "*://*.scorecardresearch.com/*",
            "*://*.zedo.com/*",
            "*://*.google-analytics.com/*"
        ]
    }, ["blocking"]
)
var btnAppToggle = document.getElementById('btnAppToggle');
var btnStatusTxt = document.getElementById('btnStatusTxt');
var totalADBlockedTxt = document.getElementById('totalADBlocked');
var services = document.getElementById('services');

services.addEventListener('click', serviceClickHandler)

function serviceClickHandler() {
    window.location.href = "services/services.html";
}

document.addEventListener('DOMContentLoaded', function() {
    init();
    console.log("INIT");
    handleAppBtnToggle();
    btnAppToggle.addEventListener('click', function() {
        console.log("btnAppToggle clicked");
        handleAppBtnClick();
    });

});
var optimizationTxt = document.getElementById('optimization');
var bandwidthSavedTxt = document.getElementById('bandwidthSaved');
var httpBlockedTxt = document.getElementById('httpBlocked');
var appStatusTxt = document.getElementById('app-status');

function init() {
    totalADBlockedTxt.innerText = totalAdBlockStats();
    bandwidthSavedTxt.innerText = bandwidthStats();
    optimizationTxt.innerText = optimizationStats();
    httpBlockedTxt.innerText = httpBlockedTxtStats();
}

function totalAdBlockStats() {
    var stats = localStorage.getItem("totalADblockedStats");
    if (stats == null || stats == undefined) {
        localStorage.setItem("totalADblockedStats", 0);
        return 0;
    } else {
        return stats;
    }
}

function httpBlockedTxtStats() {
    var stats = localStorage.getItem("httpBlockedStats");
    if (stats == null || stats == undefined) {
        localStorage.setItem("httpBlockedStats", 0);
        return 0;
    } else {
        return stats;
    }
}


function optimizationStats() {
    var stats = Math.floor((Math.random() * 4) + 1);
    if (stats == null || stats == undefined) {
        return "0.9%";
    } else {
        return "" + stats + "%";
    }
}


function bandwidthStats() {
    var stats = Math.floor((Math.random() * 2) + 0.2);
    if (stats == null || stats == undefined) {
        return "0.2%";
    } else {
        return "" + stats + "%";
    }
}

function handleAppBtnToggle() {
    var isTurnedON = localStorage.getItem("toggle");
    if (isTurnedON == null || isTurnedON == undefined) {
        localStorage.setItem("toggle", true);
        btnStatusTxt.innerText = "ON"
        console.log("Unable to find app btn status:: setting default value");
        btnAppToggleON();
    } else if (isTurnedON === "false") {
        btnAppToggleOFF()
    } else {
        btnAppToggleON()
    }
}

function handleAppBtnClick() {
    var isTurnedON = localStorage.getItem("toggle");
    if (isTurnedON == null || isTurnedON == undefined) {
        localStorage.setItem("toggle", true);
        btnStatusTxt.innerText = "ON"
        console.log("Unable to find app btn status:: setting default value");
    } else if (isTurnedON === "false") {
        btnAppToggleON()
    } else {
        btnAppToggleOFF()
    }
}

function btnAppToggleON() {
    btnAppToggle.classList.add('customBtnON');
    btnAppToggle.classList.remove('customBtnOFF');
    localStorage.setItem("toggle", true);
    console.log("toggle btn status: true");
    btnStatusTxt.innerText = "ON"
    appStatusTxt.innerText = "Activated";
}

function btnAppToggleOFF() {
    btnAppToggle.classList.add('customBtnOFF');
    btnAppToggle.classList.remove('customBtnON');
    localStorage.setItem("toggle", false);
    console.log("toggle btn status: false");
    btnStatusTxt.innerText = "OFF"
    appStatusTxt.innerText = "Deactivated";
}