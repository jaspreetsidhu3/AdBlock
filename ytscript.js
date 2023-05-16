console.log("YOUTUBE ADs BLOCKER");
localStorage.setItem("YouTube", "true");

setInterval(function() {
    //ytp-ad-text-overlay ytp-ad-enhanced-overlay

    var numberOFYTAdsBlocked = 0;
    var ytBlockedAnalytics = localStorage.getItem("YTBlockedAnalytics");
    if (ytBlockedAnalytics == null || ytBlockedAnalytics == undefined) {
        localStorage.setItem("ytBlockedAnalytics", 10);
        console.log("Unable to find app btn status:: setting default value");
    } else {
        var convertedNumber = parseInt(ytBlockedAnalytics);
        if (convertedNumber > 0)
            localStorage.setItem("YTBlockedAnalytics", numberOFYTAdsBlocked + convertedNumber);
    }

    console.log("YouTube");
    var skipButton = document.getElementsByClassName("ytp-ad-skip-button ytp-button");
    var adOverlay = document.getElementsByClassName("ytp-ad-text-overlay ytp-ad-enhanced-overlay");
    var subscribe = document.getElementsByClassName("style-scope ytd-video-owner-renderer");
    if (skipButton != undefined && skipButton.length > 0) {
        console.log("Youtube Ad detected");
        skipButton[0].click();
    } else {
        console.log("No Youtube Ad found");
    }
    if (adOverlay != undefined && adOverlay.length > 0) {
        console.log("YouTube Ad Overlay found");
        adOverlay.parentNode.removeChild(adOverlay);
    }
    if (subscribe != undefined && subscribe.length > 0) {
        subscribe.parentNode.removeChild(subscribe);
    }
}, 3000)