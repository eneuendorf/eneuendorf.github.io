const scriptUrl = "https://script.google.com/macros/s/AKfycbyg38uBjS0mJMmjNqWmJsuJ-rass4xaWF_syO4ZY3ydA39CvnoNvdEsQnEMwR4DJIu_bA/exec";

let lastTimestamp = 0; // Track last update time

async function fetchTranslations() {
    try {
        console.log("Fetching new translations...");

        const urlParams = new URLSearchParams(window.location.search);
        const language = urlParams.get("lang") || "spanish";

        // Force a fresh response by appending a timestamp (prevents caching)
        const response = await fetch(scriptUrl + "?nocache=" + Date.now(), { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();

        if (!data.translations || !data.translations[language]) {
            console.error("Error: Translation data missing for", language);
            return;
        }

        let newText = data.translations[language].replace(/\n/g, "<br>");
        let currentText = document.getElementById("latestParagraph");
        let transcript = document.getElementById("transcript");
        let anchor = document.getElementById("anchor");

        // Only update if the timestamp is newer
        if (data.timestamp > lastTimestamp) {
            console.log("New translation detected, updating page...");

            if (currentText.innerHTML.trim() !== "") {
                transcript.innerHTML += currentText.innerHTML + "<br>";
            }
            currentText.innerHTML = newText;
            anchor.scrollIntoView({ behavior: "smooth" });

            lastTimestamp = data.timestamp; // Store latest timestamp

            // Debugging: Update title with last update time
            document.title = "Updated at " + new Date().toLocaleTimeString();
        } else {
            console.log("No new updates.");
        }
    } catch (error) {
        console.error("Error fetching translations:", error);
    }
}

// Ensure the first update happens immediately
async function startPolling() {
    await fetchTranslations(); // Fetch immediately on load
    setInterval(fetchTranslations, 10000); // Then continue every 10 seconds
}

// Start polling when page loads
window.onload = startPolling;
