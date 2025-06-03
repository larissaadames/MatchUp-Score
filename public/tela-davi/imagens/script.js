const usuarioAtualId = 42;

const reservasUsuario = [
  // FUTEBOL
  { id: 1, userId: 42, quadra: "Arena Central", esporte: "Futebol", data: "25/05/2025", hora: "19:00" },
  { id: 2, userId: 42, quadra: "Campo Verde", esporte: "Futebol", data: "28/05/2025", hora: "20:00" },

  // FUT7 (SINTÉTICO)
  { id: 3, userId: 42, quadra: "Sintético A", esporte: "Fut7", data: "30/05/2025", hora: "18:00" },
  { id: 4, userId: 42, quadra: "Sintético B", esporte: "Fut7", data: "31/05/2025", hora: "20:00" },

  // VOLEI
  { id: 5, userId: 42, quadra: "Ginásio Leste", esporte: "Volei", data: "01/06/2025", hora: "16:00" },
  { id: 6, userId: 42, quadra: "Praia Norte", esporte: "Volei", data: "03/06/2025", hora: "15:00" },

  // BASQUETE
  { id: 7, userId: 42, quadra: "Quadra Coberta 1", esporte: "Basquete", data: "05/06/2025", hora: "17:00" },
  { id: 8, userId: 42, quadra: "Centro Esportivo Sul", esporte: "Basquete", data: "07/06/2025", hora: "18:30" },

  // KART
  { id: 9, userId: 42, quadra: "Kart Track 1", esporte: "Kart", data: "10/06/2025", hora: "17:00" },
  { id: 10, userId: 42, quadra: "Kart Arena Norte", esporte: "Kart", data: "12/06/2025", hora: "19:00" },

  // FUTSAL
  { id: 11, userId: 42, quadra: "Futsal Clube", esporte: "Futsal", data: "15/06/2025", hora: "20:00" },
  { id: 12, userId: 42, quadra: "Futsal Indoor", esporte: "Futsal", data: "17/06/2025", hora: "21:00" }
];

function mostrarPopUp() {
  document.getElementById("overlay").classList.add("active");
}

function fecharPopUp() {
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("formMatchup").reset();
  document.getElementById("reserva").innerHTML = "";
  document.getElementById("quadra").value = "";
  document.getElementById("data").value = "";
  document.getElementById("hora").value = "";
}

function filtrarReservasPorEsporte() {
  const esporteSelecionado = document.getElementById("esporte").value;
  const select = document.getElementById("reserva");
  select.innerHTML = "";

  const reservasFiltradas = reservasUsuario.filter(r =>
    r.userId === usuarioAtualId &&
    r.esporte === esporteSelecionado &&
    isDataFutura(r.data)
  );

  reservasFiltradas.forEach(r => {
    const option = document.createElement("option");
    option.value = r.id;
    option.textContent = `${r.quadra} (${r.data} ${r.hora})`;
    select.appendChild(option);
  });

  preencherCamposFixos();
}

function preencherCamposFixos() {
  const id = parseInt(document.getElementById("reserva").value);
  const reserva = reservasUsuario.find(r => r.id === id);
  if (!reserva) return;

  document.getElementById("quadra").value = reserva.quadra;
  document.getElementById("data").value = reserva.data;
  document.getElementById("hora").value = reserva.hora;

  const capacidadeMax = obterCapacidadeMaxima(reserva.esporte);
  document.getElementById("capacidade").max = capacidadeMax;
}

function criarMatchup(event) {
  event.preventDefault();

  const id = parseInt(document.getElementById("reserva").value);
  const reserva = reservasUsuario.find(r => r.id === id);
  const nome = document.getElementById("nome").value;
  const capacidade = parseInt(document.getElementById("capacidade").value);

  const capacidadeMax = obterCapacidadeMaxima(reserva.esporte);
  if (capacidade <= 0 || capacidade > capacidadeMax) {
    alert(`Capacidade inválida. Máximo permitido para ${reserva.esporte} é ${capacidadeMax}.`);
    return;
  }

  const novaMatchup = {
    userId: usuarioAtualId,
    idReserva: id,
    nome: nome,
    quadra: reserva.quadra,
    esporte: reserva.esporte,
    data: reserva.data,
    hora: reserva.hora,
    capacidade: capacidade,
    capacidadeMaxima: capacidadeMax,
    imagem: getImagemPorEsporte(reserva.esporte)
  };

  const matchups = JSON.parse(localStorage.getItem("matchups")) || [];
  matchups.push(novaMatchup);
  localStorage.setItem("matchups", JSON.stringify(matchups));

  fecharPopUp();
  exibirMatchups();
}

function exibirMatchups() {
  const container = document.getElementById("matchup-cards");
  container.innerHTML = "";

  const matchups = JSON.parse(localStorage.getItem("matchups")) || [];

  const futurasDoUsuario = matchups.filter(m =>
    m.userId === usuarioAtualId && isDataFutura(m.data)
  );

  if (futurasDoUsuario.length === 0) {
    container.innerHTML = "<p>Nenhuma matchup futura encontrada.</p>";
    return;
  }

  futurasDoUsuario.forEach(m => {
    const card = document.createElement("div");
    card.classList.add("quadra-card");

    card.innerHTML = `
      <img src="${m.imagem}" alt="Imagem ${m.esporte}" />
      <h3>${m.nome}</h3>
      <p>Quadra: ${m.quadra}</p>
      <p>Data: ${m.data} - Hora: ${m.hora}</p>
      <p>Capacidade: ${m.capacidade} / ${m.capacidadeMaxima}</p>
      <div class="rating">★★★★★</div>
    `;

    container.appendChild(card);
  });
}

function obterCapacidadeMaxima(esporte) {
  const capacidades = {
    Futebol: 22,
    Fut7: 14,
    Futsal: 10,
    Volei: 12,
    Basquete: 10,
    Kart: 20
  };
  return capacidades[esporte] || 10;
}

function getImagemPorEsporte(esporte) {
  const imagens = {
    Futebol: "imagens/futebol.jpg",
    Futsal: "imagens/futsal.jpg",
    Fut7: "imagens/sintetico.jpg",
    Basquete: "imagens/basquete.jpg",
    Kart: "imagens/kart.jpg",
    Volei: "imagens/volei.jpg"
  };

  console.log("Esporte recebido:", esporte); // debug

  return imagens[esporte] || "imagens/futebol.jpg";
}


function isDataFutura(dataStr) {
  const hoje = new Date();
  const [dia, mes, ano] = dataStr.split('/');
  const data = new Date(ano, mes - 1, dia);
  return data >= hoje;
}

window.onload = () => exibirMatchups();