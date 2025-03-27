chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: "http://167.172.226.87:8085/webshark/" });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveFile") {
        if (!request.filename.endsWith(".pcap")) {
            sendResponse({ status: "error", message: "Invalid file type. Only .pcap allowed." });
            return;
        }

        chrome.storage.local.set({ pcapFile: request.data }, () => {
            console.log("PCAP file saved to local storage");
            sendResponse({ status: "success" });
        });
    }
    return true;
});
