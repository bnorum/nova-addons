const port = browser.runtime.connect();

document.getElementById('send').addEventListener('click', () => {
  const prompt = document.getElementById('prompt').value.trim();
  const responseDiv = document.getElementById('response');

  if (!prompt) return;

  responseDiv.innerHTML = "<em>Loading...</em>";
  let fullText = "";

 

  port.postMessage({ type: 'generate', prompt });

  responseDiv.innerHTML = `<div id="streamed" class="markdown-body"></div>`;
  const streamed = document.getElementById("streamed");

  port.onMessage.addListener(msg => {
    if (msg.error) {
      clearTimeout(timeoutId);
      responseDiv.textContent = `Error: ${msg.error}`;
    } else if (msg.chunk) {
      clearTimeout(timeoutId);
      fullText += msg.chunk;
      streamed.innerHTML = marked.parse(fullText);
    } else if (msg.done) {
      if (!document.getElementById('view-full')) {
        const button = document.createElement('button');
        button.id = 'view-full';
        button.textContent = 'View Full';
        responseDiv.appendChild(button);
    
        button.addEventListener('click', () => {
          const content = encodeURIComponent(fullText);
          browser.tabs.create({ url: browser.runtime.getURL('fullview.html') + `?text=${content}` });
        });
      }
    }

  });
});
