const usuarioAtualId = 99; // Simulação do usuário logado
const amigosIds = [77, 123, 222]; // Simulação de amigos do usuário

function carregarMatchups() {
  return JSON.parse(localStorage.getItem("matchups")) || [];
}

function salvarMatchups(matchups) {
  localStorage.setItem("matchups", JSON.stringify(matchups));
}

function exibirMatchups() {
  const container = document.querySelector(".matchup-container");
  if (!container) return;
  container.innerHTML = "";

  const matchups = carregarMatchups();

  matchups.forEach((m) => {
    const card = document.createElement("div");
    card.classList.add("quadra-card");

    const amigoPresente = m.participantes?.some((id) => amigosIds.includes(id));
    const status = m.tipo === "privado" ? "Privado" : "Público";
    const statusClasse = m.tipo === "privado" ? "privado" : "publico";

    card.innerHTML = `
      <img src="${m.imagem}" alt="${m.nome}">
      <h3>${m.nome}</h3>
      <p>${m.quadra}</p>
      <p>Data: ${m.data}</p>
      <p>${m.capacidade}/${m.capacidadeMaxima}</p>
      <div class="status ${statusClasse}">${status}</div>
      ${amigoPresente ? '<p class="sucesso">Amigo participando!</p>' : ""}
    `;

    card.onclick = () => abrirDetalhes(m);
    container.appendChild(card);
  });

  exibirNotificacoes();
}

function abrirDetalhes(matchup) {
  document.getElementById("popup-nome").innerText = matchup.nome;
  document.getElementById("popup-quadra").innerText = matchup.quadra;
  document.getElementById("popup-data").innerText = matchup.data;
  document.getElementById("popup-hora").innerText = matchup.hora;
  document.getElementById("popup-capacidade").innerText = `${matchup.capacidade}/${matchup.capacidadeMaxima}`;

  const btnEntrar = document.getElementById("btn-entrar");
  const msgPrivado = document.getElementById("mensagem-privado");

  if (matchup.tipo === "privado") {
    btnEntrar.innerText = "Solicitar Participação";
    btnEntrar.onclick = () => solicitarParticipacao(matchup.id);
    msgPrivado.innerText = "Essa é uma matchup privada. Será necessário aprovação para participar.";
  } else {
    btnEntrar.innerText = "Entrar na Partida";
    btnEntrar.onclick = () => confirmarEntrada(matchup.id);
    msgPrivado.innerText = "";
  }

  document.querySelector(".popup").classList.add("active");
}

function fecharPopupDetalhes() {
  document.querySelector(".popup").classList.remove("active");
}

function confirmarEntrada(idMatchup) {
  const matchups = carregarMatchups();
  const m = matchups.find(m => m.id === idMatchup);
  if (!m) return;

  if (m.capacidade >= m.capacidadeMaxima) {
    criarNotificacao("⚠️ Capacidade máxima atingida.");
    fecharPopupDetalhes();
    return;
  }

  if (!m.participantes.includes(usuarioAtualId)) {
    m.participantes.push(usuarioAtualId);
    m.capacidade++;
    salvarMatchups(matchups);
    criarNotificacao("✅ Você entrou na partida com sucesso!");
    fecharPopupDetalhes();
    exibirMatchups();
  }
}

function solicitarParticipacao(idMatchup) {
  const matchups = carregarMatchups();
  const m = matchups.find(m => m.id === idMatchup);
  if (!m) return;

  if (!m.solicitacoes.includes(usuarioAtualId)) {
    m.solicitacoes.push(usuarioAtualId);
    salvarMatchups(matchups);
    criarNotificacao("📨 Solicitação enviada ao criador da partida.");
  } else {
    criarNotificacao("⚠️ Você já solicitou participação nesta matchup.");
  }

  fecharPopupDetalhes();
}

function exibirNotificacoes() {
  const container = document.getElementById("notificacoes");
  if (!container) return;

  container.innerHTML = ""; // Limpa as notificações antigas

  const matchups = carregarMatchups();
  const minhasMatchups = matchups.filter(m =>
    m.userId === usuarioAtualId &&
    m.tipo === "privado" &&
    m.solicitacoes?.length > 0
  );

  minhasMatchups.forEach(m => {
    m.solicitacoes.forEach(solicitanteId => {
      const div = document.createElement("div");
      div.classList.add("notificacao-item");
      div.innerHTML = `
        📨 Solicitação para <strong>${m.nome}</strong> (ID: ${solicitanteId})
        <button onclick="aceitarSolicitacao(${m.id}, ${solicitanteId})">✔️</button>
        <button onclick="recusarSolicitacao(${m.id}, ${solicitanteId})">❌</button>
      `;
      container.appendChild(div);
    });
  });
}

function aceitarSolicitacao(idMatchup, solicitanteId) {
  const matchups = carregarMatchups();
  const m = matchups.find(m => m.id === idMatchup);
  if (!m) return;

  if (!m.participantes.includes(solicitanteId)) {
    m.participantes.push(solicitanteId);
    m.capacidade++;
  }

  m.solicitacoes = m.solicitacoes.filter(id => id !== solicitanteId);
  salvarMatchups(matchups);
  criarNotificacao(`✅ Solicitação de ${solicitanteId} aceita!`);
  exibirNotificacoes();
  exibirMatchups();
}

function recusarSolicitacao(idMatchup, solicitanteId) {
  const matchups = carregarMatchups();
  const m = matchups.find(m => m.id === idMatchup);
  if (!m) return;

  m.solicitacoes = m.solicitacoes.filter(id => id !== solicitanteId);
  salvarMatchups(matchups);
  criarNotificacao(`❌ Solicitação de ${solicitanteId} recusada.`);
  exibirNotificacoes();
}

function criarNotificacao(texto) {
  const container = document.getElementById("notificacoes");
  if (!container) return;

  const item = document.createElement("div");
  item.classList.add("notificacao-item");
  item.textContent = texto;
  container.appendChild(item);

  setTimeout(() => item.remove(), 6000);
}

document.addEventListener("DOMContentLoaded", () => {
  exibirMatchups();
  criarNotificacao("🔔 Sistema pronto para uso!");
});
