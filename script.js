// Select elements to update
let baseEggYield = document.querySelector("#baseEggYield");
let baseFeatherYield = document.querySelector("#baseFeatherYield");
let sleepingTime = document.querySelector("#sleepingTime");

// Define checkboxes affecting egg yield, feather yield, and sleeping time
let eggYieldCheckboxes = [
    { id: "eggYield1", value: 0.1 },
    { id: "eggYield2", value: 0.1 },
    { id: "eggYield3", value: 0.2 },
    { id: "eggYield4", value: 1.0 },
    { id: "eggYield5", value: 0.1 },
    { id: "eggYield6", value: 0.1 },
    { id: "eggYield7", value: 0.2 },
    { id: "animalYield1", value: 0.25 },
    { id: "animalYield2", value: 0.1 }
];

let featherYieldCheckboxes = [
    { id: "featherYield1", value: 0.1 },
    { id: "featherYield2", value: 1.0 },
    { id: "featherYield3", value: 0.1 },
    { id: "animalYield1", value: 0.25 },
    { id: "animalYield2", value: 0.1 }
];



// Function to update egg yield
function updateEggYield() {
    let totalYield = 0; // Base egg yield

    eggYieldCheckboxes.forEach(item => {
        let checkbox = document.getElementById(item.id);
        if (checkbox && checkbox.checked) {
            totalYield += item.value;
        }
    });

    baseEggYield.textContent = totalYield.toFixed(2);
}

// Function to update feather yield
function updateFeatherYield() {
    let totalFeathers = 0; // Base feather yield

    featherYieldCheckboxes.forEach(item => {
        let checkbox = document.getElementById(item.id);
        if (checkbox && checkbox.checked) {
            totalFeathers += item.value;
        }
    });

    baseFeatherYield.textContent = totalFeathers.toFixed(2);
}


let sleepingTimeCheckboxes = [
    { id: "sleepingTime2", reduction: "02:00:00" }  // -2 hours (fixed)
];

function updateSleepingTime() {
    let baseTimeInSeconds = 24 * 60 * 60; // 24:00:00 in seconds (86,400)

    // Apply fixed reductions from checkboxes
    sleepingTimeCheckboxes.forEach(item => {
        let checkbox = document.getElementById(item.id);
        if (checkbox && checkbox.checked) {
            let reduction = item.reduction.split(":").map(Number);
            let reductionInSeconds = reduction[0] * 3600 + reduction[1] * 60 + reduction[2];
            baseTimeInSeconds -= reductionInSeconds;
        }
    });

    // Apply a 10% reduction if "Speed Chicken" (sleepingTime1) is checked
    let speedChickenCheckbox = document.getElementById("sleepingTime1");
    if (speedChickenCheckbox && speedChickenCheckbox.checked) {
        baseTimeInSeconds *= 0.9; // Reduce by 10%
        baseTimeInSeconds = Math.floor(baseTimeInSeconds);
    }

    // Apply an additional 10% reduction if "Restless Animals" (sleepingTime3) is checked
    let restlessAnimalsCheckbox = document.getElementById("sleepingTime3");
    if (restlessAnimalsCheckbox && restlessAnimalsCheckbox.checked) {
        baseTimeInSeconds *= 0.9; // Reduce by another 10%
        baseTimeInSeconds = Math.floor(baseTimeInSeconds);
    }

    // Apply an additional 10% reduction if "Wrangler" (sleepingTime4) is checked
    let wranglerCheckbox = document.getElementById("sleepingTime4");
    if (wranglerCheckbox && wranglerCheckbox.checked) {
        baseTimeInSeconds *= 0.9; // Reduce by another 10%
        baseTimeInSeconds = Math.floor(baseTimeInSeconds);
    }

    // Ensure no negative values
    if (baseTimeInSeconds < 0) baseTimeInSeconds = 0;

    // Convert back to HH:MM:SS format
    let hours = Math.floor(baseTimeInSeconds / 3600);
    let minutes = Math.floor((baseTimeInSeconds % 3600) / 60);
    let seconds = baseTimeInSeconds % 60;

    // Update the displayed sleeping time
    document.getElementById("sleepingTime").textContent = 
        [hours, minutes, seconds].map(n => String(n).padStart(2, "0")).join(":");
}


// Define a single handler function
function checkboxChangeHandler() {
    updateEggYield();
    updateFeatherYield();
    updateSleepingTime();
}

// Attach event listeners to all relevant checkboxes
[...eggYieldCheckboxes, ...featherYieldCheckboxes, ...sleepingTimeCheckboxes].forEach(item => {
    let checkbox = document.getElementById(item.id);
    if (checkbox) {
        checkbox.removeEventListener("change", checkboxChangeHandler); // Remove old listener
        checkbox.addEventListener("change", checkboxChangeHandler); // Add new listener
    }
});

// Initialize values on page load
document.addEventListener("DOMContentLoaded", () => {
    // Get all checkboxes related to sleeping time (including sleepingTime4)
    let sleepCheckboxes = document.querySelectorAll("#sleepingTime1, #sleepingTime2, #sleepingTime3, #sleepingTime4");

    // Attach event listeners to update in real-time
    sleepCheckboxes.forEach(checkbox => {
        checkbox.removeEventListener("change", updateSleepingTime); // Ensure no duplicate listeners
        checkbox.addEventListener("change", updateSleepingTime);
    });

    // Run once on page load to set correct initial values
    updateEggYield();
    updateFeatherYield();
    updateSleepingTime();
});
//################################################################################

let baseFeedCost = 1; // Base feeding cost

let feedingCostModifiers = [
    { id: "feedingReduction1", factor: 0.9 },  // -10% reduction
    { id: "feedingReduction2", factor: 0.75 }, // -25% reduction
    { id: "feedingReduction3", factor: 0.95 }, // -5% reduction
    { id: "feedingReduction4", factor: 0.75 }, // -25% reduction
    { id: "feedingIncrease1", factor: 1.5 }   // +50% increase
];

function updateFeedingCost() {
    let finalCost = baseFeedCost;

    // Check if "Golden Egg" (free feeding) checkbox is checked
    let freeFeedCheckbox = document.getElementById("freeFeedCost");
    if (freeFeedCheckbox && freeFeedCheckbox.checked) {
        finalCost = 0; // Set feeding cost to zero
    } else {
        // Apply reductions & additions based on checked checkboxes
        feedingCostModifiers.forEach(item => {
            let checkbox = document.getElementById(item.id);
            if (checkbox && checkbox.checked) {
                finalCost *= item.factor;
            }
        });

        // Ensure feeding cost is not negative
        if (finalCost < 0) finalCost = 0;
    }

    // Update all elements with class "feedCost"
    document.querySelectorAll(".feedCost").forEach(element => {
        element.textContent = finalCost.toFixed(2);
    });
}

// Event Listener
document.addEventListener("DOMContentLoaded", () => {
    let checkboxes = document.querySelectorAll("#feedingReduction1, #feedingReduction2, #feedingReduction3, #feedingReduction4, #feedingIncrease1, #freeFeedCost");

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateFeedingCost);
    });

    // Initialize feeding cost on page load
    updateFeedingCost();
});

//####################################################################################
document.addEventListener("DOMContentLoaded", () => {
    let doubleXPCheckbox = document.getElementById("feedingIncrease1"); // Using existing Chonky Feed checkbox
    let xpElements = document.querySelectorAll(".feedXP");

    // Store the original XP values
    xpElements.forEach(element => {
        element.setAttribute("data-base-xp", element.textContent.replace(/\D/g, "")); // Store base XP
    });

    function updateFeedXP() {
        xpElements.forEach(element => {
            let baseXP = parseInt(element.getAttribute("data-base-xp"), 10);
            let newXP = doubleXPCheckbox.checked ? baseXP * 2 : baseXP;
            element.textContent = `XP ${newXP}`;
        });
    }

    // Listen for checkbox changes
    doubleXPCheckbox.addEventListener("change", updateFeedXP);
});



//#################################################################################
//#################################################################################

const feedtype1 = document.querySelectorAll(".feedtype1");
const feedtype2 = document.querySelectorAll(".feedtype2");
const feedtype3 = document.querySelectorAll(".feedtype3");
const feedtype4 = document.querySelectorAll(".feedtype4");
const feedButton = document.querySelector("#feedButton");

feedButton.onclick = feedButtonGems;

function feedButtonFeeds() {
    feedButton.innerText = "Feed Type: Feeds";
    feedButton.onclick = feedButtonGems;

    // Loop through each element in the NodeList and update text
    feedtype1.forEach(feed => {
        feed.innerText = "Kernel Blend";
    });
    feedtype2.forEach(feed => {
        feed.innerText = "Hay";
    });
    feedtype3.forEach(feed => {
        feed.innerText = "NutriBarley";
    });
    feedtype4.forEach(feed => {
        feed.innerText = "Mixed Grain";
    });

    
}

function feedButtonGems() {
    feedButton.innerText = "Feed Type: Gems";
    feedButton.onclick = feedButtonFeeds;

    // Loop through each element in the NodeList and update text
    feedtype1.forEach(feed => {
        feed.textContent = "Omnifeed";
    });
    feedtype2.forEach(feed => {
        feed.innerText = "Omnifeed";
    });
    feedtype3.forEach(feed => {
        feed.innerText = "Omnifeed";
    });
    feedtype4.forEach(feed => {
        feed.innerText = "Omnifeed";
    });
}
