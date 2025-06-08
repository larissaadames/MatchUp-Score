// scriptEntrar.js

const usuarioAtualId = 42; // Simulação

// Matchups simuladas criadas por outros usuários
const matchupsDisponiveis = [
  {
    id: 201,
    userId: 99,
    nome: "Fut da Esquina",
    quadra: "Arena Central",
    esporte: "Fut7",
    data: "20/07/2025",
    hora: "19:30",
    capacidade: 10,
    capacidadeMaxima: 12,
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
  }
];

let matchupSelecionada = null;

function exibirMatchupsDisponiveis() {
  const container = document.getElementById("matchup-disponiveis");
  container.innerHTML = "";

  matchupsDisponiveis.forEach(m => {
    const card = document.createElement("div");
    card.classList.add("quadra-card");
    card.innerHTML = `
      <img src="${m.imagem}" alt="Imagem ${m.esporte}">
      <h3>${m.nome}</h3>
      <p>${m.quadra}</p>
      <p>Data: ${m.data}</p>
      <p>${m.capacidade}/${m.capacidadeMaxima}</p>
    `;
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

window.onload = () => exibirMatchupsDisponiveis();