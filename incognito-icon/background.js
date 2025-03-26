chrome.browserAction.onClicked.addListener(() => {
    chrome.windows.create({
      incognito: true
    });
  });
  