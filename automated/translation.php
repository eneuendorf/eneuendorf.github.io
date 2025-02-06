<?php
// Get the language from the URL (default to "spanish")
$language = isset($_GET['lang']) ? $_GET['lang'] : 'spanish';

// Page titles for each language
$titles = [
    "spanish" => "Traducción a Español",
    "arabic" => "الترجمة إلى العربية",
    "french" => "Traduction en Français",
    "german" => "Übersetzung ins Deutsche",
];

// Set the page title based on the language
$pageTitle = isset($titles[$language]) ? $titles[$language] : "Translation";

// HTML output
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js"></script> <!-- Link to the JavaScript file -->
</head>
<body>
    <h2><?php echo $pageTitle; ?></h2>
    <p id="latestParagraph"></p>
    <p id="transcript"></p>
</body>
</html>
