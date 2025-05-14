// Função para exibir o pop-up
function mostrarPopUp() {
    // Preenche data e hora atuais no formulário
    const now = new Date();
    const dataInput = document.getElementById('data');
    const horaInput = document.getElementById('hora');

    dataInput.value = now.toLocaleDateString('pt-BR');
    horaInput.value = now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});

    document.getElementById('overlay').classList.add('active');
}

// Função para fechar o pop-up
function fecharPopUp() {
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('formMatchup').reset();
}

// Função para criar uma nova matchup e exibir o card
function criarMatchup(event) {
    event.preventDefault(); // Previne o envio do formulário

    // Pegando os dados do formulário
    const nome = document.getElementById('nome').value;
    const esporte = document.getElementById('esporte').value;
    const reserva = document.getElementById('reserva').value; // Captura da reserva
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const capacidade = parseInt(document.getElementById('capacidade').value, 10);

    if (capacidade <= 0) {
        alert("A capacidade deve ser um número positivo.");
        return;
    }

    if (!reserva) {
        alert("Por favor, selecione uma quadra.");
        return;
    }

    // Recuperando as matchups do Local Storage
    let matchups = JSON.parse(localStorage.getItem('matchups')) || [];

    // Obter a capacidade máxima com base no esporte selecionado
    const capacidadeMaxima = obterCapacidadeMaxima(esporte);

    if (capacidade > capacidadeMaxima) {
        alert(`A capacidade máxima para o esporte ${esporte} é ${capacidadeMaxima}.`);
        return;
    }

    // Criando a nova matchup
    const novaMatchup = {
        nome: nome,
        esporte: esporte,
        reserva: reserva,
        data: data,
        hora: hora,
        capacidade: capacidade,
        capacidadeMaxima: capacidadeMaxima,
        quadra: getQuadraInfo(reserva) // Adiciona a quadra associada ao matchup
    };

    // Adicionando a nova matchup ao array
    matchups.push(novaMatchup);

    // Atualizando o Local Storage com as novas matchups
    localStorage.setItem('matchups', JSON.stringify(matchups));

    // Fechar o pop-up
    fecharPopUp();

    // Atualizar os cards
    exibirMatchups();
}

// Função para obter as informações da quadra com base no nome
function getQuadraInfo(reserva) {
    const quadras = {
        'Quadra do Ney': {
            imagem: 'https://via.placeholder.com/300x200?text=Quadra+do+Ney',
            endereco: 'Rua NeymarCansado- 195'
        },
        'Quadra do Messi': {
            imagem: 'https://via.placeholder.com/300x200?text=Quadra+do+Messi',
            endereco: 'Rua Messi- 100'
        }
    };

    if (!quadras[reserva]) {
        return { imagem: 'https://via.placeholder.com/300x200?text=Quadra+Desconhecida', endereco: 'Endereço desconhecido' };
    }

    return quadras[reserva];
}

// Função para obter a capacidade máxima com base no esporte
function obterCapacidadeMaxima(esporte) {
    const capacidades = {
        'Futebol': 22,
        'Futsal': 10,
        'Volei': 12,
        'Basquete': 10,
        'Kart': 4
    };

    return capacidades[esporte] || 10; // Caso o esporte não esteja listado, assume 10 como padrão
}

// Função para exibir os cards das matchups
function exibirMatchups() {
    const matchupCardsContainer = document.getElementById('matchup-cards');
    matchupCardsContainer.innerHTML = ''; // Limpa os cards existentes

    let matchups = JSON.parse(localStorage.getItem('matchups')) || [];

    if (matchups.length === 0) {
        matchupCardsContainer.innerHTML = "<p>Nenhuma matchup criada ainda.</p>";
        return;
    }

    matchups.forEach(matchup => {
        const card = document.createElement('div');
        card.classList.add('quadra-card');

        card.innerHTML = `
            <img src="${matchup.quadra.imagem}" alt="Imagem da quadra ${matchup.nome}">
            <h3>${matchup.nome}</h3>
            <p>Quadra: ${matchup.quadra.endereco}</p>
            <p>Data: ${matchup.data} - Hora: ${matchup.hora}</p>
            <p>Capacidade: ${matchup.capacidade} / ${matchup.capacidadeMaxima}</p>
            <div class="rating">★★★★★</div>
        `;

        matchupCardsContainer.appendChild(card);
    });
}

// Carregar as matchups quando a página for carregada
window.onload = function() {
    exibirMatchups();
};
