const api = apiRequest;

// Function to track page visit
function trackPageVisit() {
    const pageUrl = window.location.href;
    const agent = navigator.userAgent;

    // Call the API with the URL of the page the user visited
    api.apiPost('/xtracking', { url: pageUrl, agent: agent })
        .then(response => {
            console.log("Tracking saved");
        })
        .catch(error => {
            console.error("Error in tracking:", error);
        });
}

// Trigger the function when the page is fully loaded
window.onload = trackPageVisit;