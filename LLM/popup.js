

document.getElementById('send').addEventListener('click', () => {
  const prompt = document.getElementById('prompt').value.trim();
  const responseDiv = document.getElementById('response');

  if (prompt) {
    responseDiv.innerHTML = "<em>Loading...</em>";

    // Set up the timeout explosion (10s)
    const timeoutId = setTimeout(() => {
      if (responseDiv.innerText.trim() === "Loading...") {
        responseDiv.innerHTML = '<img src="explosion.png" alt="The LLM exploded!" class="boom">';
        document.body.classList.add('explode');
        const audio = new Audio('explosion.mp3');
        audio.play();

      }
    }, 10000);

    // Ask the LLM
    browser.runtime.sendMessage({ prompt: prompt }, response => {
      clearTimeout(timeoutId); // Cancel explosion if we got a response

      if (response.error) {
        responseDiv.textContent = `Error: ${response.error}`;
      } else {
        try {
          const html = marked.parse(response.result || "*No response.*");
          responseDiv.innerHTML = `
            <button id="view-full">View Full</button>
            <div class="markdown-body">${html}</div>
          `;
        
          // Store result and open full view
          document.getElementById('view-full').addEventListener('click', () => {
            const content = encodeURIComponent(response.result);
            browser.tabs.create({ url: browser.runtime.getURL('fullview.html') + `?text=${content}` });


          });
        } catch (err) {
          responseDiv.textContent = `Error rendering Markdown: ${err.message}`;
        }

      }
    });
  }
});
