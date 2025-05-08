const port = browser.runtime.connect();

let fullText = "";
let streamed = null;

// Avoid multiple listeners
port.onMessage.addListener((msg) => {
  if (!streamed) return;

  if (msg.error) {
    streamed.innerHTML = `<span style="color:red;">Error: ${msg.error}</span>`;
  } else if (msg.chunk) {
    fullText += msg.chunk;
    streamed.innerHTML = marked.parse(fullText);
  } else if (msg.done) {
    if (!document.getElementById('view-full')) {
      const button = document.createElement('button');
      button.id = 'view-full';
      button.textContent = 'View Full';
      button.style.marginTop = '10px';
      streamed.appendChild(button);

      button.addEventListener('click', () => {
        const content = encodeURIComponent(fullText);
        browser.tabs.create({
          url: browser.runtime.getURL('fullview.html') + `?text=${content}`
        });
      });
    }
  }
});

document.getElementById('send').addEventListener('click', () => {
  const prompt = document.getElementById('prompt').value.trim();
  const responseDiv = document.getElementById('response');

  if (!prompt) return;

  fullText = "";
  responseDiv.innerHTML = `<div id="streamed" class="markdown-body"><em>Loading...</em></div>`;
  streamed = document.getElementById("streamed");

  port.postMessage({ type: 'generate', prompt });
});
