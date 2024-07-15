let balance = parseInt(localStorage.getItem('balance')) || 0;
const normalMultiplier = 5;
let isTapping = false; // Flag to prevent simultaneous tapping

// Function to handle tap events
function handleTap(event) {
    if (!isTapping) {
        isTapping = true;
        let increment = normalMultiplier;
        balance += increment;
        showCoinAnimation(event, increment);
        vibrateCoin();
        localStorage.setItem('balance', balance); // Store balance in localStorage
        setTimeout(() => {
            isTapping = false; // Reset tapping flag after processing
        }, 100); // Adjust this delay as needed to handle rapid tapping
    }
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

function vibrateCoin() {
    const galaxyElement = document.querySelector('.galaxy');
    galaxyElement.classList.add('vibrate');
    setTimeout(() => {
        galaxyElement.classList.remove('vibrate');
    }, 200); // Duration of the vibration animation
}

// Function to give welcome bonus to users
function giveWelcomeBonus() {
    if (!localStorage.getItem('welcomeBonusGiven')) {
        balance += 1000000; // Add 1 million coins as welcome bonus
        localStorage.setItem('balance', balance); // Store balance in localStorage
        localStorage.setItem('welcomeBonusGiven', 'true'); // Mark welcome bonus as given
    }
}

// Give welcome bonus if applicable
giveWelcomeBonus();
