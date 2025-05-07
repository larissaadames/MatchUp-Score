// Array para armazenar as matchups
let matchups = [];

// Função para exibir o pop-up
function mostrarPopUp() {
    document.getElementById('overlay').style.display = 'block';
}

// Função para fechar o pop-up
function fecharPopUp() {
    document.getElementById('overlay').style.display = 'none';
}

// Função para criar uma nova matchup e exibir o card
function criarMatchup(event) {
    event.preventDefault(); // Previne o envio do formulário

    // Pegando os dados do formulário
    const nome = document.getElementById('nome').value;
    const espaco = document.getElementById('espaco').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const capacidade = document.getElementById('capacidade').value;

    // Criando a nova matchup
    const novaMatchup = {
        nome: nome,
        espaco: espaco,
        data: data,
        hora: hora,
        capacidade: capacidade
    };

    // Adicionando a nova matchup ao array
    matchups.push(novaMatchup);

    // Fechar o pop-up
    fecharPopUp();

    // Atualizar os cards
    exibirMatchups();
}

// Função para exibir os cards das matchups
function exibirMatchups() {
    const matchupCardsContainer = document.getElementById('matchup-cards');
    matchupCardsContainer.innerHTML = ''; // Limpa os cards existentes

    matchups.forEach(matchup => {
        const card = document.createElement('div');
        card.classList.add('quadra-card');
        
        card.innerHTML = `
            <img src="https://via.placeholder.com/300x200" alt="${matchup.nome}">
            <h3>${matchup.nome}</h3>
            <p>Espaço: ${matchup.espaco}</p>
            <p>Data: ${matchup.data} - Hora: ${matchup.hora}</p>
            <p>Capacidade: ${matchup.capacidade}</p>
            <div class="rating">★★★★★</div>
        `;
        
        matchupCardsContainer.appendChild(card);
    });
}
