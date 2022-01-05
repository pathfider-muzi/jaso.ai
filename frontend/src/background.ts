import init from "./content";

chrome.webNavigation.onTabReplaced.addListener(function (details) {
    chrome.tabs.get(details.tabId, function(tab) {
      init();
    });
 });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if (changeInfo.url) {
        alert("dldll")
        init();
        console.log('Tab %d got new URL: %s', tabId, changeInfo.url);
    }
});