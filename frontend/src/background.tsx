import init from "./content";
import getNamuWikiContentElements from "./utils/findContentElement/getNamuWikiContentElements";

chrome.webNavigation.onTabReplaced.addListener(function (details) {
  chrome.tabs.get(details.tabId, function (tab) {
    init();
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    alert(changeInfo.url);
    init();
  }
});
