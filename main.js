
const table = document.getElementById('leaderboard');


document.getElementById('addPlayer').addEventListener('click', addPlayer);
function addPlayer() {
    const playerScore = document.getElementById('playerScore').value;
    const country = document.getElementById('country').value;
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;

    if (!firstName || !lastName || !country || !playerScore) {
        return alert('All fields are required');
    }

    const player = {
        firstName,
        lastName,
        country,
        playerScore
    };

    const players = JSON.parse(localStorage.getItem('players')) || [];

    players.push(player);

    reshuffle(players);

    document.getElementById('playerScore').value = '';
    document.getElementById('country').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('firstName').value = '';

    // alert('Player added to leaderboard');
}

// add dom content loaded event listener for initial view
document.addEventListener('DOMContentLoaded', updateLeaderboard);

function updateLeaderboard() {
    const players = JSON.parse(localStorage.getItem('players')) || [];


    console.log('players', players);

    // clear the table
    table.innerHTML = '';

    // Insert header row
    const row = table.insertRow(0);
    row.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Score</th>
            <th>Actions</th>
        </tr>
        `;
    if (players.length === 0) {
        return;
    }
    else {

        // Insert data rows
        players.forEach((player, index) => {

            const row = table.insertRow(index + 1);
            row.innerHTML = `
                <td>${player.firstName} ${player.lastName}</td>
                <td>${player.country}</td>
                <td>${player.playerScore}</td>
                <td>
                    <div class="actions">
                    <button onclick="deletePlayer(${index})">🗑️</button>
                    <button onclick="updateScore(${index}, 5)">+5</button>
                    <button onclick="updateScore(${index}, -5)">-5</button>
                    </div>
                </td>
            `;
        });
    }

}

window.addEventListener('storage', function (e) {
    console.log("localstorage is", JSON.stringify(e.storageArea));
});

window.deletePlayer = function (index) {
    const players = JSON.parse(localStorage.getItem('players')) || [];

    players.splice(index, 1);

    reshuffle(players);
}

window.updateScore = function (index, value) {
    const players = JSON.parse(localStorage.getItem('players')) || [];

    players[index].playerScore = parseInt(players[index].playerScore) + value;

    reshuffle(players);
    
}

window.reshuffle = function (players) {
    // sort players based on score
    players.sort((a, b) => a.playerScore - b.playerScore);

    localStorage.setItem('players', JSON.stringify(players));

    updateLeaderboard();
}