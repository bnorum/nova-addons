const funFacts = [
    "NOVA was born on September 1, 2024.",
    "NOVA has existed since 2024. It's currently 0 years old!",
    "NOVA is a browser, if you believe it.",
    "NOVA was created at Hofstra University.",
    "NOVA was created by Roshni Varkey, and Brady Norum.",
    "NOVA is on GitHub, and it's open source!",
    "NOVA was built predominantly with web extensions."
];

let factIndex = 0;

function updateFunFact() {
    const funFactElement = document.getElementById('funFact');
    funFactElement.textContent = `Did you know? ${funFacts[factIndex]}`;
    factIndex = (factIndex + 1) % funFacts.length;
}

document.addEventListener("DOMContentLoaded", function() {
    updateFunFact();
    setInterval(updateFunFact, 200000);
    const engineSelect = document.getElementById('engineSelect');
    if (engineSelect) {
      engineSelect.style.marginTop = "20px";
      engineSelect.style.padding = "10px 12px";
      engineSelect.style.paddingRight = "40px";
      engineSelect.style.borderRadius = "8px";
      engineSelect.style.fontSize = "16px";
      engineSelect.style.backgroundColor = "#2d2d2d";
      engineSelect.style.color = "#ffffff";
      engineSelect.style.border = "2px solid #3a3a3a";
      engineSelect.style.appearance = "none";
      engineSelect.style.MozAppearance = "none";
      engineSelect.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg fill=%22white%22 height=%2216%22 viewBox=%220 0 24 24%22 width=%2216%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M7 10l5 5 5-5z%22/></svg>')";
      engineSelect.style.backgroundRepeat = "no-repeat";
      engineSelect.style.backgroundPosition = "right 12px center";
      engineSelect.style.backgroundSize = "16px";
    }
});




const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const select = document.getElementById('engineSelect');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const baseUrl = select.value;
  const query = encodeURIComponent(input.value.trim());
  if (query) {
    window.location.href = baseUrl + query;
  }
});

browser.runtime.sendMessage("isIncognito?").then((isIncognito) => {
  if (isIncognito) {
    const label = document.createElement("div");
    label.textContent = "INCOGNITO";
    label.style.color = "#ff5555";
    label.style.fontWeight = "bold";
    label.style.marginTop = "10px";
    label.style.fontSize = "20px";
    label.style.letterSpacing = "1px";
    label.style.textTransform = "uppercase";
    label.style.textAlign = "center";

    const titleBlock = document.querySelector("h1");
    if (titleBlock && titleBlock.parentElement) {
      titleBlock.parentElement.insertAdjacentElement("afterend", label);
    }
  }
});
