# Nova Browser Addons

This repository contains a collection of **custom extensions** developed for the [Nova Browser](https://github.com/bnorum/nova), a fast and privacy-focused web browser. These add-ons expand the browser's functionality, from blocking telemetry to customizing user interactions.

## 🧩 Addons Overview

Each folder in this repository contains the source code and manifest for an individual Nova browser extension. Example extensions may include:

- **telemetry-removal**: Strips tracking scripts and analytics calls from websites.
- **LLM**: Allows users to utilize a **locally-run** LLM to chat and answer questions.
- **start-screen**: Replaces Firefox UI with a set of elements that don't utilize history-tracking.



## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/bnorum/nova-addons.git
cd nova-addons
```

### Load an Extension in Nova

1. Launch the Nova browser.
2. Navigate to the **Extensions** page (typically `nova://extensions`).
3. Click **Load Unpacked** or **Install from Folder**.
4. Select the directory of the extension you want to load (e.g., `telemetry-blocker/`).

## 📁 Project Structure

```
nova-addons/
├── telemetry-blocker/
│   ├── manifest.json
│   ├── background.js
│   └── ...
├── LLM/
│   ├── manifest.json
│   ├── content.js
│   └── ...
└── README.md
```

## 📖 Developing Your Own Addon

Nova extensions follow a structure similar to WebExtensions (used in Firefox/Chrome), with some custom Nova-specific APIs. To create a new addon:

1. Create a new folder with a `manifest.json`.
2. Include any background, content, or UI scripts.
3. Refer to Nova's extension API documentation for supported features.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

For more information on the Nova browser or to contribute to the core engine, check out the [Nova repository](https://github.com/bnorum/nova).

Let me know if you want it tailored for publishing on the Nova Extensions Store (if one exists or is planned)!
