const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');
const detailsContainer = document.querySelector('#details-container');
// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-ET-WEB-PT-A'; 
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}`);
        const allPlayers = await response.json();
        return allPlayers.data.players;

    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};


const fetchSinglePlayer = async (id) => { 
    try {
        const response = await fetch(`${APIURL}/${id}`);
        const singlePlayer = await response.json();
        console.log(singlePlayer)
        return singlePlayer;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${id}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(`${APIURL}/${playerObj}`, {
            method: 'POST',
        });
        const newPlayer = await response.json();
        return playerObj;
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/${playerId}`, {
            method: 'DELETE',
        });
        const deletedPlayer = await response.json();
        return deletedPlayer;
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};
// const renderBetterDetails = async (id) => {
//     try {
//         const player = await fetchSinglePlayer(id);
//         playerContainer.innerHTML = '';
//         const playerDetails = document.createElement('div');
//         playerDetails.classList.add('player-detail');
//           playerDetails.innerHTML = `
//                     <h2>${player.name}</h2>
//                     <p>${player.breed}</p>
//                     <p>${player.status}</p>
//                     <img src=${player.imageUrl} alt="Avatar" style="width:300px;height:300px;">
//                     <button class="close-button" data-id="${player.id}">Close</button>
//                 `;
//           detailsContainer.appendChild(playerDetails);
    
//           // see details
    
//           const closeButton = playerDetails.querySelector('.details-button');
//           closeButton.addEventListener('click', async (event) => {
//             playerDetails.remove();
//             playerContainer.style.visibility = "visible";
//             // your code here
//           });
//     } catch (err) {
//         console.error('Uh oh, trouble rendering players!', err);
//     }
// }
/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roaster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */

const renderAllPlayers = (playerList) => {
    try {
        //playerContainer.innerHTML = '';
        playerList.forEach((player) => {
          const playerElement = document.createElement('div');
          playerElement.classList.add('player');
          playerElement.innerHTML = `
          ${player.id}
                    <h2>${player.name}</h2>
                    <p>${player.breed}</p>
                    <img src=${player.imageUrl} alt="Avatar" style="width:300px;height:300px;">
                    <button class="details-button" data-id="${player.id}">See Details</button>
                    <button class="delete-button" data-id="${player.id}">Delete</button>
                `;
        //   playerContainer.appendChild(playerElement);
    
          // see details
    
          const detailsButton = playerElement.querySelector('.details-button');
          detailsButton.addEventListener('click', async (event) => {
          const resp = await fetchSinglePlayer(player.id);
          console.log(player.id + ' test BTN: ' + resp.data.player.name)
            // playerContainer.style.visibility = "visible";
            playerElement.innerHTML = `ID: ${resp.data.player.id}`
            // your code here
          });
          playerContainer.appendChild(playerElement);
    
          // delete player
          const deleteButton = playerElement.querySelector('.delete-button');
          deleteButton.addEventListener('click', async (event) => {
            deletePlayer(player.id);
            // your code here
          });
        });
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
    const asd = await fetchSinglePlayer(1);
    console.log(asd);
    console.log(players);
    renderNewPlayerForm();
  
}

init();