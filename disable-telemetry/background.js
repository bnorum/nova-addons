const blockList = [
    "*://*.google-analytics.com/*",
    "*://*.googletagmanager.com/*",
    "*://*.facebook.net/*",
    "*://*.connect.facebook.net/*",
    "*://*.facebook.com/tr/*",
    "*://*.fbcdn.net/*",
    "*://*.graph.facebook.com/*",
    "*://*.ads.facebook.com/*",
    "*://*.pixel.facebook.com/*",
    "*://*.doubleclick.net/*",
    "*://*.adservice.google.com/*",
    "*://*.googlesyndication.com/*",
    "*://*.hotjar.com/*",
    "*://*.cloudflareinsights.com/*",
    "*://*.newrelic.com/*",
    "*://*.optimizely.com/*",
    "*://*.mixpanel.com/*",
    "*://*.segment.io/*",
    "*://*.mouseflow.com/*"
  ];
  
  browser.webRequest.onBeforeRequest.addListener(
    (details) => {
      console.log(`Blocked by Disable Telemetry: ${details.url}`);
      return { cancel: true }; // Ensures it's labeled as blocked
    },
    { urls: blockList },
    ["blocking"]
  );
  