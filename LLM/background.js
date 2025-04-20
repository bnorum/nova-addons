browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  fetch('http://localhost:3000/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'gemma3', prompt: request.prompt, stream: false })
  })
  .then(response => response.json())
  .then(data => sendResponse({ result: data.response }))
  .catch(error => sendResponse({ error: error.message }));

  return true;
});
