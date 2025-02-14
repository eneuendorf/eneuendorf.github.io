const WS_SERVER = "wss://translation-websocket-server.repl.co"; // Your WebSocket server URL

const socket = new WebSocket(WS_SERVER);

socket.onopen = () => {
    console.log("✅ Connected to WebSocket server");
};

socket.onmessage = (event) => {
    try {
        console.log("📩 Received new translation:", event.data);

        const data = JSON.parse(event.data);
        const urlParams = new URLSearchParams(window.location.search);
        const language = urlParams.get("lang") || "spanish"; // Default to Spanish

        if (data.translations && data.translations[language]) {
            let newText = data.translations[language].replace(/\n/g, "<br>");
            document.getElementById("latestParagraph").innerHTML = newText;
        }
    } catch (error) {
        console.error("❌ Error processing WebSocket message:", error);
    }
};

socket.onerror = (error) => {
    console.error("⚠️ WebSocket error:", error);
};

socket.onclose = () => {
    console.warn("⚠️ WebSocket disconnected. Reconnecting in 5 seconds...");
    setTimeout(() => location.reload(), 5000); // Auto-reconnect if disconnected
};
