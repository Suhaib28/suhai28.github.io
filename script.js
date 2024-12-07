const apiKey = "b3de239d60msh0db6def5961ecdfp1b2481jsn0508b24836e3";
const apiHost = "mma-stats.p.rapidapi.com";

// Function to fetch fighter profiles
async function fetchFighterProfiles(fighterName) {
    const url = `https://${apiHost}/fighters?search=${encodeURIComponent(fighterName)}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Failed to fetch fighter profiles.");
        const data = await response.json();
        displayFighterProfiles(data);
    } catch (error) {
        console.error("Error:", error);
        alert("Unable to fetch fighter profiles. Please try again later.");
    }
}

// Function to fetch upcoming fights
async function fetchUpcomingFights() {
    const url = `https://${apiHost}/events/upcoming`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Failed to fetch upcoming fights.");
        const data = await response.json();
        displayUpcomingFights(data);
    } catch (error) {
        console.error("Error:", error);
        alert("Unable to fetch upcoming fights. Please try again later.");
    }
}

// Display fighter profiles in the DOM
function displayFighterProfiles(fighters) {
    const container = document.getElementById("fighters-container");
    container.innerHTML = ""; // Clear previous content

    if (fighters.length === 0) {
        container.innerHTML = "<p>No fighters found.</p>";
        return;
    }

    fighters.forEach(fighter => {
        const card = document.createElement("div");
        card.className = "fighter-card";
        card.innerHTML = `
            <h3>${fighter.name}</h3>
            <p>Nickname: ${fighter.nickname || "N/A"}</p>
            <p>Weight Class: ${fighter.weight_class || "N/A"}</p>
            <p>Record: ${fighter.record || "N/A"}</p>
        `;
        container.appendChild(card);
    });
}

// Display upcoming fights in the DOM
function displayUpcomingFights(events) {
    const container = document.getElementById("events-container");
    container.innerHTML = ""; // Clear previous content

    if (!events || events.length === 0) {
        container.innerHTML = "<p>No upcoming events found.</p>";
        return;
    }

    events.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${event.date || "TBD"}</p>
            <p>Location: ${event.location || "TBD"}</p>
        `;
        container.appendChild(card);
    });
}
