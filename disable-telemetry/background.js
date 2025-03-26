// List of telemetry-related URL patterns to block
const telemetryUrls = [
    "*://*.telemetry.mozilla.org/*",
    "*://telemetry.mozilla.org/*",
    "*://crash-reports.mozilla.com/*",
    "*://crash-stats.mozilla.org/*",
    "*://incoming.telemetry.mozilla.org/*",
    "*://settings.crash-stats.mozilla.org/*"
  ];
  
browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        console.log("Blocked request to:", details.url); // Log blocked URLs
        return { cancel: true };
    },
    { urls: telemetryUrls },
    ["blocking"]
);