document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const earnButton = document.getElementById('earn-button');
    const spendButton = document.getElementById('spend-button');

    let balance = 0;

    earnButton.addEventListener('click', () => {
        balance += 10; // Earn 10 Notcoins
        updateBalance();
    });

    spendButton.addEventListener('click', () => {
        if (balance >= 10) {
            balance -= 10; // Spend 10 Notcoins
            updateBalance();
        } else {
            alert('Not enough Notcoins!');
        }
    });

    function updateBalance() {
        balanceElement.textContent = balance;
    }
});
