browser.runtime.onMessage.addListener((msg, sender) => {
    if (msg === "isIncognito?") {
      return Promise.resolve(browser.extension.inIncognitoContext);
    }
  });