const usuarioAtualId = 99; // Simulação do usuário logado
const amigosIds = [77, 123, 222]; // Simulação de amigos

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

  const matchups = carregarMatchups().filter(m => m.userId !== usuarioAtualId);

  matchups.forEach((m) => {
    const card = document.createElement("div");
    card.classList.add("quadra-card");

    const amigoPresente = m.participantes?.some(id => amigosIds.includes(id));
    const statusTexto = m.tipo === "privado" ? "Privado" : "Público";
    const statusCor = m.tipo === "privado" ? "red" : "green";

    card.innerHTML = `
      <img src="${m.imagem}" alt="${m.nome}">
      <h3>${m.nome}</h3>
      <p><strong>${m.quadra}</strong></p>
      <p><strong>Data:</strong> ${m.data}</p>
      <p><strong>Hora:</strong> ${m.hora}</p>
      <p><strong>Capacidade:</strong> ${m.capacidade}/${m.capacidadeMaxima}</p>
      <p style="color: ${statusCor}; font-weight: bold;">${statusTexto}</p>
      ${amigoPresente ? '<p class="sucesso">👥 Amigo participando!</p>' : ''}
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
    msgPrivado.innerText = "Essa partida é privada. É necessário aprovação.";
  } else {
    btnEntrar.innerText = "Entrar na Partida";
    btnEntrar.onclick = () => confirmarEntrada(matchup.id);
    msgPrivado.innerText = "";
  }

  document.getElementById("popup-overlay").classList.add("active");
}

function fecharPopupDetalhes() {
  document.getElementById("popup-overlay").classList.remove("active");
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
  container.innerHTML = "";
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
