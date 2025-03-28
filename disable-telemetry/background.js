console.log("Disable Telemetry extension loaded!");

const blockList = [
  "*://*.facebook.com/tr/*",  // Facebook tracking pixel
  "*://*.connect.facebook.net/en_US/fbevents.js",  // Pixel tracker
  "*://*.facebook.net/signals/config/*",  // Tracking config
  "*://*.graph.facebook.com/logging_client_events",  // Logs user actions
  "*://*.graph.facebook.com/v*/me/friends",  // Possible tracking request
  "*://*.pixel.facebook.com/*",  // Pixel tracking
  "*://*.ads.facebook.com/*"  // Facebook ads telemetry
];



browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log(`Blocked by NOVA Telemetry Handler: ${details.url}`);
    return { cancel: true };
  },
  { urls: blockList },
  ["blocking"]
);
  