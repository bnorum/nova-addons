document.getElementById('send').addEventListener('click', () => {
  const prompt = document.getElementById('prompt').value.trim();
  const responseDiv = document.getElementById('response');

  if (prompt) {
    responseDiv.innerHTML = "<em>Loading...</em>";

    browser.runtime.sendMessage({ prompt: prompt }, response => {
      if (response.error) {
        responseDiv.textContent = `Error: ${response.error}`;
      } else {
        try {
          console.log('Response received:', response.result);  // Add this
          const html = marked.parse(response.result);          // This might throw
          responseDiv.innerHTML = `<div class="markdown-body">${html}</div>`;
        } catch (err) {
          console.error('Markdown parsing error:', err);
          responseDiv.textContent = `Error rendering Markdown: ${err.message}`;
        }
      }
    });
  }
});
