import init from "./content";
import getNamuWikiContentElements from "./utils/findContentElement/getNamuWikiContentElements";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    //alert(changeInfo.url);

    chrome.tabs.sendMessage(
      tabId,
      { message: "tab_url_changed" },
      function (response) {}
    );
  }
});
