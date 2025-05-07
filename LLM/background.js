browser.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(async (msg) => {
    if (msg.type === 'generate') {
      try {
        const response = await fetch('http://localhost:3000/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'gemma3:1b-it-qat',
            prompt: msg.prompt,
            stream: true
          })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter(line => line.trim().startsWith("{"));

          for (const line of lines) {
            const json = JSON.parse(line);
            if (json.done) {
              port.postMessage({ done: true });
              return;
            }

            port.postMessage({ chunk: json.response || "" });
          }
        }
      } catch (err) {
        port.postMessage({ error: err.message });
      }
    }
  });
});
