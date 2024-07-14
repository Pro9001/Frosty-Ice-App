let balance = parseInt(localStorage.getItem('balance')) || 0;
let turboActive = false;
let botBought = false;
const turboMultiplier = 30;
const normalMultiplier = 5;
const botPrice = 100000;
let energy = 5000;
const maxEnergy = 5000;
let isTapping = false; // Flag to prevent simultaneous tapping

// Function to handle tap events
function handleTap(event) {
    if (!isTapping && energy >= 5) {
        isTapping = true;
        let increment = turboActive ? turboMultiplier : normalMultiplier;
        balance += increment;
        energy -= 5;
        document.getElementById('balance').innerText = balance;
        updateEnergyBar();
        showCoinAnimation(event, increment);
        localStorage.setItem('balance', balance); // Store balance in localStorage
        setTimeout(() => {
            isTapping = false; // Reset tapping flag after processing
        }, 100); // Adjust this delay as needed to handle rapid tapping
    } else if (energy < 5) {
        alert('Not enough energy.');
    }
}

function updateEnergyBar() {
    const energyBar = document.getElementById('energy-bar');
    const energyPercentage = (energy / maxEnergy) * 100;
    energyBar.style.width = `${energyPercentage}%`;
}

function showCoinAnimation(event, increment) {
    const coinAnim = document.createElement('div');
    coinAnim.className = 'coin-anim';
    coinAnim.innerText = `+${increment} coins`;
    document.body.appendChild(coinAnim);

    const rect = event.target.getBoundingClientRect();
    coinAnim.style.left = `${rect.left + rect.width / 2 - 50}px`;
    coinAnim.style.top = `${rect.top}px`;

    setTimeout(() => {
        document.body.removeChild(coinAnim);
    }, 2000);
}

function toggleBoost() {
    const boostOptions = document.getElementById('boost-options');
    boostOptions.classList.toggle('hidden');
    showConfirmation('Boost activated!');
}

function activateTurbo() {
    turboActive = !turboActive;
    showConfirmation(`Turbo ${turboActive ? 'activated' : 'deactivated'}`);
}

function buyBot() {
    if (balance >= botPrice) {
        balance -= botPrice;
        botBought = true;
        document.getElementById('balance').innerText = balance;
        localStorage.setItem('balance', balance); // Store balance in localStorage
        setInterval(() => {
            if (botBought) {
                balance += 100;
                document.getElementById('balance').innerText = balance;
                localStorage.setItem('balance', balance); // Store balance in localStorage
            }
        }, 1000);
        showConfirmation('Bot purchased!');
    } else {
        alert('Not enough balance to purchase Bot.');
    }
}

function showAbout() {
    const aboutSection = document.getElementById('about-section');
    aboutSection.classList.toggle('hidden');
}

function showReferral() {
    const referralSection = document.getElementById('referral-section');
    referralSection.classList.toggle('hidden');
}

function showConfirmation(message) {
    alert(message);
}

// Function to give welcome bonus to users
function giveWelcomeBonus() {
    if (!localStorage.getItem('welcomeBonusGiven')) {
        balance += 1000000; // Add 1 million coins as welcome bonus
        localStorage.setItem('balance', balance); // Store balance in localStorage
        localStorage.setItem('welcomeBonusGiven', true); // Mark welcome bonus as given
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let totalJoined = parseInt(localStorage.getItem('totalJoined')) || 0;
    totalJoined++;
    localStorage.setItem('totalJoined', totalJoined);
    document.getElementById('total-joined').innerText = totalJoined;
    giveWelcomeBonus(); // Call function to give welcome bonus
    balance = parseInt(localStorage.getItem('balance')) || 0; // Retrieve balance from localStorage
    document.getElementById('balance').innerText = balance; // Update balance display
    updateEnergyBar();
});
