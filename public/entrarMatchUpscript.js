// entrarMatchUpscript.js - VERSÃO CORRIGIDA E MELHORADA

const usuarioAtualId = 42; // Simulação

// Matchups simuladas criadas por outros usuários
const matchupsDisponiveis = [
    {
        id: 201,
        userId: 99,
        nome: "Fut da Esquina",
        quadra: "Arena Central, Rua Teste, 123",
        esporte: "Fut7",
        data: "20/07/2025",
        hora: "19:30",
        capacidade: 8,
        capacidadeMaxima: 10,
        imagem: "../imagens/sintetico.jpg",
        participantes: []
    },
    {
        id: 202,
        userId: 88,
        nome: "Clássico do Bairro",
        quadra: "Campo Verde",
        esporte: "Futebol",
        data: "21/07/2025",
        hora: "20:00",
        capacidade: 11,
        capacidadeMaxima: 12,
        imagem: "../imagens/futebol.jpg",
        participantes: []
    },
    {
        id: 203,
        userId: 77,
        nome: "Racha dos Amigos",
        quadra: "Ginásio Municipal",
        esporte: "Futsal",
        data: "22/07/2025",
        hora: "21:00",
        capacidade: 4,
        capacidadeMaxima: 10,
        imagem: "../imagens/futsal.jpg",
        participantes: []
    }
];

let matchupSelecionada = null;

/**
 * NOVO: Função auxiliar para criar os 5 ícones de participantes
 * com base na lotação da partida.
 */
function gerarIconesHtml(vagasOcupadas, vagasMaximas) {
    let iconesHtml = '';
    // Calcula a proporção de vagas ocupadas e define quantos dos 5 ícones estarão "cheios"
    const proporcao = vagasOcupadas / vagasMaximas;
    const iconesCheios = Math.round(proporcao * 5);

    for (let i = 0; i < 5; i++) {
        if (i < iconesCheios) {
            // Ícone de usuário preenchido
            iconesHtml += `<i class="fa-solid fa-user"></i>`;
        } else {
            // Ícone de usuário vazio
            iconesHtml += `<i class="fa-regular fa-user"></i>`;
        }
    }
    return iconesHtml;
}


/**
 * FUNÇÃO PRINCIPAL (MODIFICADA)
 * Agora ela cria os cards com a estrutura HTML correta.
 */
function exibirMatchupsDisponiveis() {
    const container = document.getElementById("matchup-disponiveis");
    container.innerHTML = ""; // Limpa o container antes de adicionar os novos cards

    if (matchupsDisponiveis.length === 0) {
        container.innerHTML = "<p class='loading-message'>Nenhum matchup disponível no momento.</p>";
        return;
    }

    matchupsDisponiveis.forEach(m => {
        const card = document.createElement("div");
        // FIX 1: Usar a classe "card" que estilizados no CSS
        card.classList.add("card");

        // Gera os ícones de participantes para este card
        const iconesDeParticipantes = gerarIconesHtml(m.capacidade, m.capacidadeMaxima);

        // FIX 2: Usar a estrutura HTML final com as classes corretas
        card.innerHTML = `
            <div class="card-title">
                <h3>${m.nome}</h3>
            </div>
            <div class="card-image">
                <img src="${m.imagem}" alt="Imagem da quadra ${m.quadra}">
            </div>
            <div class="card-content">
                <p class="card-address">${m.quadra}</p>
                <p class="card-time">Horário: ${m.hora}</p>
                <div class="card-players">
                    ${iconesDeParticipantes}
                    <span>${m.capacidade}/${m.capacidadeMaxima}</span>
                </div>
            </div>
        `;

        // A lógica de clique para abrir o popup continua a mesma
        card.onclick = () => abrirDetalhes(m);
        container.appendChild(card);
    });
}


// As funções abaixo não precisam de alteração
function abrirDetalhes(matchup) {
    matchupSelecionada = matchup;
    document.getElementById("popup-nome").innerText = matchup.nome;
    document.getElementById("popup-quadra").innerText = matchup.quadra;
    document.getElementById("popup-data").innerText = matchup.data;
    document.getElementById("popup-hora").innerText = matchup.hora;
    document.getElementById("popup-capacidade").innerText = `${matchup.capacidade} / ${matchup.capacidadeMaxima}`;
    document.getElementById("popup-matchup").classList.add("active");
}

function fecharPopupDetalhes() {
    document.getElementById("popup-matchup").classList.remove("active");
    matchupSelecionada = null;
}

function confirmarEntrada() {
    if (!matchupSelecionada) return;

    if (matchupSelecionada.participantes.includes(usuarioAtualId)) {
        alert("Você já está participando desta partida.");
        return;
    }

    if (matchupSelecionada.capacidade >= matchupSelecionada.capacidadeMaxima) {
        alert("Capacidade máxima atingida!");
        return;
    }

    matchupSelecionada.capacidade++;
    matchupSelecionada.participantes.push(usuarioAtualId);
    alert("Você entrou na partida!");

    fecharPopupDetalhes();
    exibirMatchupsDisponiveis(); // Atualiza a exibição dos cards
}

// Inicia a exibição dos matchups quando a página carrega
window.onload = () => exibirMatchupsDisponiveis();