
const usuarioAtualId = 42; // Simulação

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
        imagem: "imagens/sintetico.jpg",
        participantes: [77],
        tipo: "publico",
        localizacao: "curitiba"
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
        imagem: "imagens/futebol.jpg",
        participantes: [],
        tipo: "publico",
        localizacao: "sao-paulo"
    },
    {
        id: 202,
        userId: 88,
        nome: "Vôlei da gurizadas",
        quadra: "Campo Verde",
        esporte: "Volei",
        data: "21/07/2025",
        hora: "20:00",
        capacidade: 11,
        capacidadeMaxima: 12,
        imagem: "imagens/volei.jpg",
        participantes: [],
        tipo: "publico",
        localizacao: "sao-paulo"
    },
    {
        id: 202,
        userId: 88,
        nome: "Bar sem lona X Borussia dorme",
        quadra: "Campo Verde",
        esporte: "Futebol",
        data: "18/09/2025",
        hora: "20:00",
        capacidade: 11,
        capacidadeMaxima: 12,
        imagem: "imagens/futebol.jpg",
        participantes: [],
        tipo: "privado",
        localizacao: "curitiba"
    },
    {
        id: 202,
        userId: 88,
        nome: "Só os canela FC",
        quadra: "Campo Verde",
        esporte: "Futebol",
        data: "21/07/2025",
        hora: "20:00",
        capacidade: 11,
        capacidadeMaxima: 12,
        imagem: "imagens/futebol.jpg",
        participantes: [],
        tipo: "publico",
        localizacao: "sao-paulo"
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
        imagem: "imagens/futsal.jpg",
        participantes: [],
        tipo: "privado",
        localizacao: "rio-de-janeiro"
    },
        {
        id: 203,
        userId: 77,
        nome: "Opala 6cc",
        quadra: "Interlagos",
        esporte: "Kart",
        data: "22/07/2025",
        hora: "21:00",
        capacidade: 4,
        capacidadeMaxima: 10,
        imagem: "imagens/kart.jpg",
        participantes: [],
        tipo: "privado",
        localizacao: "rio-de-janeiro"
    }
];

let matchupSelecionada = null;

function gerarIconesHtml(vagasOcupadas, vagasMaximas) {
    let iconesHtml = '';
    const proporcao = vagasOcupadas / vagasMaximas;
    const iconesCheios = Math.round(proporcao * 5);
    for (let i = 0; i < 5; i++) {
        iconesHtml += i < iconesCheios ? `<i class="fa-solid fa-user"></i>` : `<i class="fa-regular fa-user"></i>`;
    }
    return iconesHtml;
}

function exibirMatchupsDisponiveis() {
    const container = document.getElementById("matchup-disponiveis");
    const filtroEsporte = document.getElementById("filter-sport")?.value || "todos";
    const filtroLocal   = document.getElementById("filter-location")?.value || "todos";

    container.innerHTML = "";

    const filtradas = matchupsDisponiveis
        .filter(m => filtroEsporte === "todos" || m.esporte.toLowerCase() === filtroEsporte.toLowerCase())
        .filter(m => filtroLocal === "todos" || m.localizacao?.toLowerCase() === filtroLocal.toLowerCase());

    if (filtradas.length === 0) {
        container.innerHTML = "<p class='loading-message'>Nenhum matchup disponível no momento.</p>";
        return;
    }

    filtradas.forEach(m => {
        const card = document.createElement("div");
        card.classList.add("card");
        const iconesDeParticipantes = gerarIconesHtml(m.capacidade, m.capacidadeMaxima);
        const amigoPresente = m.participantes.includes(usuarioAtualId);
        const statusClasse = m.tipo === "privado" ? "privado" : "publico";
        const statusTexto = m.tipo === "privado" ? "Privado" : "Público";
        card.innerHTML = `
            <div class="card-title"><h3>${m.nome}</h3></div>
            <div class="card-image"><img src="${m.imagem}" alt="Imagem da quadra ${m.quadra}"></div>
            <div class="card-content">
                <p class="card-address">${m.quadra}</p>
                <p class="card-time">Horário: ${m.hora}</p>
                <div class="card-players">
                    ${iconesDeParticipantes}
                    <span>${m.capacidade}/${m.capacidadeMaxima}</span>
                </div>
                <div class="status ${statusClasse}">${statusTexto}</div>
                ${amigoPresente ? `<p class="sucesso"> Você está participando! </p>` : ""}
            </div>`;
        card.onclick = () => abrirDetalhes(m);
        container.appendChild(card);
    });
}

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
    exibirMatchupsDisponiveis();
}

document.getElementById("filter-sport")?.addEventListener("change", exibirMatchupsDisponiveis);
document.getElementById("filter-location")?.addEventListener("change", exibirMatchupsDisponiveis);
window.onload = () => exibirMatchupsDisponiveis();
