document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const rawEncoded = params.get('text');
    const raw = rawEncoded ? decodeURIComponent(rawEncoded) : "*No response.*";
  
    try {
      const html = marked.parse(raw);
      document.getElementById('full-response').innerHTML = html;
    } catch (err) {
      document.getElementById('full-response').textContent = `Markdown render error: ${err.message}`;
      console.error(err);
    }
  });
  