const telemetrySelectors = [
    "script[src*='google-analytics']",
    "script[src*='googletagmanager']",
    "script[src*='facebook.net']",
    "script[src*='facebook.com/tr']",
    "script[src*='facebook.com/connect']",
    "script[src*='ads.twitter']",
    "script[src*='doubleclick']",
    "script[src*='adservice.google']",
    "script[src*='googlesyndication']"
  ];

  function removeTelemetry() {
    telemetrySelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        console.log("Removing telemetry script:", el.src);
        el.remove();
      });
    });
  }

  // Initial cleanup
  removeTelemetry();
  
  // Monitor for dynamically added scripts
  const observer = new MutationObserver(() => removeTelemetry());
  observer.observe(document.documentElement, { childList: true, subtree: true });

  function blockScriptInjection() {
    const originalCreateElement = Document.prototype.createElement;
    
    Document.prototype.createElement = function(tagName, ...args) {
      if (tagName.toLowerCase() === "script") {
        console.log("Blocked script injection:", arguments);
        return null; // Prevents script creation
      }
      return originalCreateElement.apply(this, arguments);
    };
  }
  
  // Inject this function into the webpage
  const script = document.createElement("script");
  script.textContent = `(${blockScriptInjection.toString()})();`;
  document.documentElement.appendChild(script);
  script.remove();

