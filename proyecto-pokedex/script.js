class Pokemon {
  constructor(name, type, weight, moves, image) {
    this.name = name;
    this.type = type;
    this.weight = weight;
    this.moves = moves;
    this.image = image;
  }

  getMoves() {
    return this.moves.join(", ");
  }
}

class Pokedex {
  constructor(pokemons) {
    this.pokemons = pokemons;
    this.filteredPokemons = pokemons;
  }

  filterPokemons(searchTerm) {
    this.filteredPokemons = this.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.renderPokemons();
  }

  renderPokemons() {
    const listElement = document.getElementById("pokemon-list");
    listElement.innerHTML = "";

    this.filteredPokemons.forEach((pokemon) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("pokemon-card");
      cardElement.innerHTML = `
              <img src="${pokemon.image}" alt="${pokemon.name}">
              <h3>${pokemon.name}</h3>
              <p>Tipo: ${pokemon.type}</p>
          `;
      cardElement.addEventListener("click", () => this.showModal(pokemon));
      listElement.appendChild(cardElement);
    });
  }

  showModal(pokemon) {
    document.getElementById("modal-title").innerText = pokemon.name;
    document.getElementById("modal-type").innerText = pokemon.type;
    document.getElementById("modal-weight").innerText = pokemon.weight;
    document.getElementById("modal-moves").innerText = pokemon.getMoves();

    const modal = document.getElementById("pokemon-modal");
    modal.style.display = "block";

    const closeButton = document.querySelector(".close-button");
    closeButton.onclick = () => {
      modal.style.display = "none";
    };

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }
}

async function fetchPokemons() {
  const response = await fetch("pokemons.json");
  const data = await response.json();
  return data.map(
    (p) => new Pokemon(p.name, p.type, p.weight, p.moves, p.image)
  );
}

document.getElementById("search").addEventListener("input", (event) => {
  const searchTerm = event.target.value;
  pokedex.filterPokemons(searchTerm);
});

let pokedex;

fetchPokemons().then((pokemons) => {
  pokedex = new Pokedex(pokemons);
  pokedex.renderPokemons();
});
