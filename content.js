chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Check if the message is to redirect
    if (message.action === 'redirect') {
        // Perform the redirection to your extension page
        window.location.href = chrome.runtime.getURL('popup.html');
    }
});
