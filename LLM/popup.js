document.getElementById('send').addEventListener('click', () => {
    const prompt = document.getElementById('prompt').value.trim();
    const responseDiv = document.getElementById('response');
  
    if (prompt) {
      responseDiv.textContent = "Loading...";
  
      browser.runtime.sendMessage({ prompt: prompt }, response => {
        if (response.error) {
          responseDiv.textContent = `Error: ${response.error}`;
        } else {
          responseDiv.textContent = response.result;
        }
      });
    }
  });

  // popup.js
document.getElementById('send').addEventListener('click', () => {
  const prompt = document.getElementById('prompt').value.trim();
  const responseDiv = document.getElementById('response');

  if (prompt) {
    responseDiv.innerHTML = "<em>Loading...</em>";

    browser.runtime.sendMessage({ prompt: prompt }, response => {
      if (response.error) {
        responseDiv.textContent = `Error: ${response.error}`;
      } else {
        // Convert Markdown to HTML using marked
        const html = marked.parse(response.result);
        responseDiv.innerHTML = `<div class="markdown-body">${html}</div>`;
      }
    });
  }
});
