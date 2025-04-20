// Simple UI injected into every page
let prompt = window.prompt("Ask the local LLM a question:");

if (prompt) {
  chrome.runtime.sendMessage({ prompt: prompt }, response => {
    if (response.error) {
      alert(`Error: ${response.error}`);
    } else {
      alert(`LLM Response: ${response.result}`);
    }
  });
}
