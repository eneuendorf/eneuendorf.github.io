const WS_SERVER = "wss://translation-websocket.onrender.com"; // Your WebSocket server URL

function connectWebSocket() {
    const socket = new WebSocket(WS_SERVER);

    socket.onopen = () => {
        console.log("✅ Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
        console.log("📩 Received new translation:", event.data);

        try {
            const data = JSON.parse(event.data);
            const urlParams = new URLSearchParams(window.location.search);
            const language = urlParams.get("lang") || "Spanish";

            if (data.translations && data.translations[language]) {
                let newText = data.translations[language].replace(/\n/g, "<br>");
                
                // Get current transcript and latest text elements
                let currentText = document.getElementById("latestParagraph");
                let transcript = document.getElementById("transcript");

                // Append previous translation to transcript before replacing it
                if (currentText.innerHTML.trim() !== "") {
                    transcript.innerHTML += currentText.innerHTML + "<br>"; 
                }

                // Update the latest translation
                currentText.innerHTML = newText;
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
        setTimeout(connectWebSocket, 5000); // Auto-reconnect if disconnected
    };
}

// Start WebSocket connection
connectWebSocket();
