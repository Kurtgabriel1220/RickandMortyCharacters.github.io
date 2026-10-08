/* https://rickandmortyapi.com/ */
/* https://swapi.dev/api/people/ */
let currentPageUrl = 'https://rickandmortyapi.com/api/character'
let nextPageUrl = null
let previousPageUrl = null

window.onload = async () => {
    try {
    await loadCharacters(currentPageUrl)
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }


    const nextButton = document.getElementById('nextButton')
    const backButton = document.getElementById('backButton')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            card.style.backgroundImage = `url('https://rickandmortyapi.com/api/character/avatar/${character.url.replace(/\D/g, "")}.jpeg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)
        
            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"
                
                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = 
                `url('https://rickandmortyapi.com/api/character/avatar/${character.url.replace(/\D/g, "")}.jpeg')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerHTML = `Nome: ${character.name}`  

                const characterStatus = document.createElement("span")
                characterStatus.className = "character-details"
                characterStatus.innerHTML = `Status: ${covertStatus(character.status)}`

                const species = document.createElement("span")
                species.className = "character-details"
                species.innerHTML = `Espécie: ${covertSpecies(character.species)}`

                const gender = document.createElement("span")
                gender.className = "character-details"
                gender.innerHTML = `Gênero: ${covertGender(character.gender)}`

                const location = document.createElement("span")
                location.className = "character-details"
                location.innerHTML = `Dimensão: ${character.origin.name}`
                
                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterStatus)
                modalContent.appendChild(species)
                modalContent.appendChild(gender)
                modalContent.appendChild(location)
                
            }
            mainContent.appendChild(card)
        });

    const backButton = document.getElementById('backButton')
    const nextButton = document.getElementById('nextButton')

    nextButton.disabled = !responseJson.info.next
    backButton.disabled = !responseJson.info.prev

    backButton.style.visibility = responseJson.info.prev? "visible" : "hidden"

        currentPageUrl = url
        nextPageUrl = responseJson.info.next
        previousPageUrl = responseJson.info.prev

    } catch (error) {
        alert('Erro ao carregar os personagens')
        console.log(error)
    }
}

async function loadNextPage() {
    if (!nextPageUrl) return
    await loadCharacters(nextPageUrl)
}

async function loadPreviousPage() {
    if (!previousPageUrl) return
    await loadCharacters(previousPageUrl)
}

/* async function loadNextPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)
        
    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.prev)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
} */

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}

function covertGender(gender) {
    const generos = {
        male: "Masculino",
        female: "Feminino",
        unknown: "Desconhecido"
    };

    return generos[gender.toLowerCase()] || gender;
}

function covertStatus(status) {
    const Estato = {
        dead: "Morto",
        alive: "Vivo",
        unknown: "Desconhecido"
    };

    return Estato[status.toLowerCase()] || status;
}

function covertSpecies(species) {
    const Especie = {
        human: "Humano",
        alien: "Alien",
        unknown: "Desconhecido"
    };

    return Especie[species.toLowerCase()] || species;
}
