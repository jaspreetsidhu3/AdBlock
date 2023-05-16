var btnAppToggle = document.getElementById('btnAppToggle');
var btnStatusTxt = document.getElementById('btnStatusTxt');
var totalADBlockedTxt = document.getElementById('totalADBlocked');
var services = document.getElementById('services');

chrome.declarativeNetRequest.getMatchedRules(setnoOfBlockedAdsText);

services.addEventListener('click', serviceClickHandler)

function serviceClickHandler() {
    window.location.href = "servicespage/servicespage.html";
}

document.addEventListener('DOMContentLoaded', function() {
    init();
    console.log("INIT");
    initAppBtn();
    btnAppToggle.addEventListener('click', function() {
        console.log("btnAppToggle clicked");
        appBtnClick();
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
    httpBlockedTxtStats();
}

function httpBlockedTxtStats() {
    var httpBlockedStats = 0;
    chrome.storage.sync.get(["httpBlockedStats"]).then((cachedStats) => {
        console.log(cachedStats['httpBlockedStats']);
        var cacheValue = cachedStats['httpBlockedStats'];
        if (cacheValue == null || cacheValue == undefined) {
            chrome.storage.sync.set({ httpBlockedStats: 0 }).then(() => {
                console.log("httpblockedstats is set to " + 0);
                httpBlockedTxt.innerText = 0;
            });
        } else {
            var statsNumber = parseInt(cacheValue);
            if (statsNumber >= 0) {
                httpBlockedTxt.innerText = statsNumber;
            }
        }
    })
}

function setnoOfBlockedAdsText(data) {
    if (data != undefined) {
        var noOfAdsBlocked = parseInt(data.rulesMatchedInfo.length);
        if (noOfAdsBlocked > 0) {
            var blockedADStats = localStorage.getItem("totalADblockedStats");
            if (blockedADStats != null | blockedADStats != undefined) {
                blockedADStats = noOfAdsBlocked
                localStorage.setItem("totalADblockedStats", blockedADStats);
                totalADBlockedTxt.innerText = blockedADStats;
            } else {
                var blockedText = parseInt(blockedADStats);
                if (blockedText >= 0) {
                    blockedADStats = blockedADStats + noOfAdsBlocked;
                }
                localStorage.setItem("totalADblockedStats", blockedADStats);
                totalADBlockedTxt.innerText = blockedADStats;
            }
        }
    }
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

function initAppBtn() {
    var isTurnedON = localStorage.getItem("appToggle");
    if (isTurnedON == null || isTurnedON == undefined) {
        localStorage.setItem("appToggle", true);
        btnStatusTxt.innerText = "TURN OFF"
        console.log("Unable to find app btn status:: setting default value");
        showBtnOFF();
    } else if (isTurnedON === "false") {
        showBtnOFF()
        showActivated()
    } else {
        showBtnON();
        showDeactivated();
    }
}

function appBtnClick() {
    var isTurnedON = localStorage.getItem("appToggle");
    if (isTurnedON == null || isTurnedON == undefined) {
        localStorage.setItem("appToggle", true);
        showBtnOFF();
        console.log("Unable to find app btn status:: setting default value");
    } else if (isTurnedON === "false") {
        showBtnON();
        stopBlockingAd();
    } else {
        showBtnOFF();
        startBlockingAd();
    }
}

function showActivated() {
    appStatusTxt.innerText = "Activated";
}

function showDeactivated() {
    appStatusTxt.innerText = "Deactivated";
}

function showBtnON() {
    btnAppToggle.classList.add('customBtnON');
    btnAppToggle.classList.remove('customBtnOFF');
    localStorage.setItem("appToggle", true);
    console.log("toggle btn status: true");
    btnStatusTxt.innerText = "TURN ON"
}

function showBtnOFF() {
    btnAppToggle.classList.add('customBtnOFF');
    btnAppToggle.classList.remove('customBtnON');
    localStorage.setItem("appToggle", false);
    console.log("toggle btn status: false");
    btnStatusTxt.innerText = "TURN OFF"
}

function startBlockingAd() {
    console.log("blockAdvertisment enabled");
    chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: ["blockAdvertisement"],
    })
    showActivated();
    startHTTPBlocker();
}

function stopBlockingAd() {
    console.log("blockAdvertisment disabled");
    chrome.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: ["blockAdvertisement"],
    })
    showDeactivated();
    stoptHTTPBlocker();
}

function startHTTPBlocker() {
    chrome.storage.sync.set({ appToggle: true }).then(() => {
        console.log("httpblocker enabled");
    });
}

function stoptHTTPBlocker() {
    chrome.storage.sync.set({ appToggle: false }).then(() => {
        console.log("httpblocker false");
    });
}