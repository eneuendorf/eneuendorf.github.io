const scriptUrl = "https://script.google.com/macros/s/AKfycbyg38uBjS0mJMmjNqWmJsuJ-rass4xaWF_syO4ZY3ydA39CvnoNvdEsQnEMwR4DJIu_bA/exec";

let lastTimestamp = 0; // Stores last update timestamp

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

        // Update only if timestamp is newer
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

// Sync polling to the next 10-second mark
function startPolling() {
    const now = Date.now();
    const delay = 10000 - (now % 10000); // Time until next 10-second mark

    setTimeout(() => {
        fetchTranslations();
        setInterval(fetchTranslations, 2000); // Continue every 10s
    }, delay);
}

window.onload = startPolling;
