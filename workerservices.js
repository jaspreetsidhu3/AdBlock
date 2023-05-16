chrome.runtime.onInstalled.addListener((details) => {
    // const currentVersion = chrome.runtime.getManifest().version
    // const previousVersion = details.previousVersion
    const reason = details.reason
    switch (reason) {
        case 'install':
            setUpLocalStorage();
            break;
        case 'update':
            console.log('User has updated their extension.')
            break;
        default:
            console.log('Other install events within the browser')
            break;
    }

});

function setUpLocalStorage() {
    // appToggle
    chrome.storage.sync.set({ appToggle: true }).then(() => {
        console.log("appToggle is set to " + 0);
    });
    // HttpBlockerStats
    chrome.storage.sync.set({ httpBlockedStats: 0 }).then(() => {
        console.log("httpblockedstats is set to " + 0);
    });

}
chrome.tabs.onUpdated.addListener(function(tabId, changedInfo) {
    const url = changedInfo.pendingUrl || changedInfo.url;
    chrome.storage.sync.get(["appToggle"]).then((result) => {
        //console.log("result value:: " + result['toggle']);
        var isEnabled = result['appToggle'];
        if (isEnabled === "true" | isEnabled === true) {
            if (!url || !url.startsWith("http://")) {
                return;
            } else {
                //console.log("Setting httpStats");
                chrome.storage.sync.get(["httpBlockedStats"]).then((stats) => {
                    var cachedHttpBlockerStats = stats['httpBlockedStats'];
                    console.log("-------");
                    console.log(cachedHttpBlockerStats);
                    if (cachedHttpBlockerStats != null | cachedHttpBlockerStats != undefined) {
                        stats = parseInt(cachedHttpBlockerStats);
                        stats = stats + 1;
                        chrome.storage.sync.set({ httpBlockedStats: stats }).then(() => {
                            console.log("httpblockedstats is set to " + stats);
                        });
                    }
                })
                console.log("remove tab");
                let alertURL = "https://sites.google.com/view/adblockhome/http-not-secure";
                chrome.tabs.update(tabId, { url: alertURL })
            }
        } else {
            //console.log("nothing will happen as http blocker is disabled by user");
            return;
        }
    });

})