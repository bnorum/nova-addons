async function loadBlocklist() {
  try {
      const response = await fetch(browser.runtime.getURL("blocklist.json"));
      const data = await response.json();
      return data.trackers; // Only return the tracker list
  } catch (error) {
      console.error("Failed to load blocklist:", error);
      return {};
  }
}

async function setupBlocking() {
  const blocklist = await loadBlocklist();
  const rules = [];

  for (const domain in blocklist) {
      const entry = blocklist[domain];

      // Only block domains explicitly marked "block"
      if (entry.default === "block" && entry.rules) {
          entry.rules.forEach(ruleObj => {
              if (ruleObj.rule) {
                  rules.push(`*://${ruleObj.rule}*`);
              }
          });
      }
  }

  console.log("Blocking rules loaded:", rules);

  browser.webRequest.onBeforeRequest.addListener(
      (details) => {
          console.log(`Blocked: ${details.url}`);
          return { cancel: true };
      },
      { urls: rules },
      ["blocking"]
  );
}

// Run the blocking setup
setupBlocking();
