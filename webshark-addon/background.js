chrome.browserAction.onClicked.addListener(() => {
    const encodedUrl = "aHR0cDovLzE2Ny4xNzIuMjI2Ljg3OjgwODUvd2Vic2hhcmsv";
    const decodedUrl = atob(encodedUrl);
    chrome.tabs.create({ url: decodedUrl });
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
