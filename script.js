let rollHistory = [];

function rollDice() {
    const diceExpression = document.getElementById('diceExpression').value;
    const diceRegex = /(\d+)d(\d+)/g;
    let match;
    let result = 0;
    let individualResults = [];

    while ((match = diceRegex.exec(diceExpression)) !== null) {
        const numDice = parseInt(match[1]);
        const numSides = parseInt(match[2]);
        let diceRolls = [];

        for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * numSides) + 1;
            diceRolls.push(roll);
            result += roll;
        }

        individualResults.push(`${numDice}d${numSides} : ${diceRolls.join(', ')}`);
    }

    // Add the current roll to history
    const rollDetails = {
        expression: diceExpression,
        results: individualResults,
        total: result
    };
    rollHistory.push(rollDetails);

    // Display individual results and the final sum
    displayResults(individualResults, result);
}

function rollPreset(expression) {
    document.getElementById('diceExpression').value = expression;
    rollDice();
}

function displayResults(individualResults, total) {
    const resultElement = document.getElementById('result');
    const resultText = `Results:<br>${individualResults.join('<br>')}<br><br>Final Sum: ${total}`;
    resultElement.innerHTML = resultText;
}

function clearHistory() {
    rollHistory = [];
}

// Function to display history in the modal
function viewHistory() {
    const historyModal = document.getElementById('historyModal');
    const historyModalContent = document.getElementById('historyModalContent');

    // Clear the modal content
    historyModalContent.innerHTML = '';

    // Populate the modal content with roll history
    rollHistory.forEach((roll, index) => {
        const historyItem = document.createElement('div');
        historyItem.innerHTML = `<strong>Roll ${index + 1}:</strong><br>${roll.expression}<br>${roll.results.join('<br>')}<br>Total: ${roll.total}<br><br>`;
        historyModalContent.appendChild(historyItem);
    });

    // Display the modal
    historyModal.style.display = 'block';
}

function closeModal() {
    const historyModal = document.getElementById('historyModal');
    historyModal.style.display = 'none';
}
