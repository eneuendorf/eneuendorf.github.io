const scriptUrl = "https://script.google.com/macros/s/NEW_DEPLOYMENT_ID/exec?nocache=" + new Date().getTime();

let lastTimestamp = 0; // Store the last update timestamp

async function fetchTranslations() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const language = urlParams.get("lang") || "spanish";

        const response = await fetch(scriptUrl);
        const data = await response.json();
        
        if (!data.translations[language]) {
            console.error("Language not found in translations:", language);
            return;
        }

        let newText = data.translations[language].replace(/\n/g, "<br>");
        let currentText = document.getElementById("latestParagraph");
        let transcript = document.getElementById("transcript");
        let anchor = document.getElementById("anchor");

        // Only update if a new timestamp is detected
        if (data.timestamp > lastTimestamp) {
            if (currentText.innerHTML.trim() !== "") {
                transcript.innerHTML += currentText.innerHTML + "<br>";
            }
            currentText.innerHTML = newText;
            anchor.scrollIntoView({ behavior: "smooth" });
            lastTimestamp = data.timestamp; // Store latest timestamp
        }
    } catch (error) {
        console.error("Error fetching translations:", error);
    }
}

// Ensure the interval starts after the first fetch
function startPolling() {
    fetchTranslations(); // Ensure the first update happens immediately
    setInterval(fetchTranslations, 10000); // Then continue every 10s
}

window.onload = startPolling;
