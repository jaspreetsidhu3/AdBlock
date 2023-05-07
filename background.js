chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        //  console.log(details.url);
        var toggleOn = undefined;
        var result = localStorage.getItem("toggle");
        if (result == null || result == undefined) {
            toggleOn = "true";
            localStorage.setItem("toggle", true);
            console.log("First init: " + result);
        } else {
            console.log("fetching from saved result: " + result);
            turnedOn = result;
        }
        if (turnedOn === "true") {
            console.log("Blocking: " + result);
            var stats = localStorage.getItem("stats");
            if (stats != null | stats != undefined) {
                stats = parseInt(stats) + Math.floor((Math.random() * 3) + 1);
                localStorage.setItem("stats", stats);
            }
            return {
                cancel: true
            }
        } else {
            console.log("No ad blocking as per user permissions: " + result);
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
var btnON = document.getElementById('toggleON');
var btnOFF = document.getElementById('toggleOFF');
var message = document.getElementById('data');
document.addEventListener('DOMContentLoaded', function() {
    init();

    console.log("DOM");

    btnON.addEventListener('click', function() {
        localStorage.setItem("toggle", "true");
        btnON.classList.add('invisible');
        btnON.classList.remove('visible');
        btnOFF.classList.add('visible');
        btnOFF.classList.remove('invisible');
    });
    btnOFF.addEventListener('click', function() {
        // chrome.storage.local.set({
        //     "toggle": false
        // });
        localStorage.setItem("toggle", "false");
        btnON.classList.add('visible');
        btnON.classList.remove('invisible');
        btnOFF.classList.add('invisible');
        btnOFF.classList.remove('visible');
    });
});

function init() {
    console.log("INIT");
    message.innerText = "";
    var result = localStorage.getItem("toggle");
    if (result == null || result == undefined) {
        localStorage.setItem("toggle", "true");
        btnON.classList.add('invisible');
        btnON.classList.remove('visible');
        btnOFF.classList.add('visible');
        btnOFF.classList.remove('invisible');
        message.innerText = "Captain, Welcome to Ad block"
    } else if (result === "true") {
        btnON.classList.add('invisible');
        btnON.classList.remove('visible');
        btnOFF.classList.add('visible');
        btnOFF.classList.remove('invisible');
        message.innerText = "Captain, We blocked " + totalAdBlockStats() + " Ad's";
    } else if (result === "false") {
        btnON.classList.add('visible');
        btnON.classList.remove('invisible');
        btnOFF.classList.add('invisible');
        btnOFF.classList.remove('visible');
        message.innerText = "Captain, Click to stop AD's!";
    } else {
        message.innerText = "Hi, Something went wrong."
    }
}

function totalAdBlockStats() {
    var stats = localStorage.getItem("stats");
    if (stats == null || stats == undefined) {
        localStorage.setItem("stats", 0);
        return 0;
    } else {
        return stats;
    }
}