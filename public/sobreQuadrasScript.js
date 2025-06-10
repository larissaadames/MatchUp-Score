let slideIndex = 1;
mostrarSlides(slideIndex);

function proximoSlide(valorPrevNext) 
{

    mostrarSlides(slideIndex += valorPrevNext);

}

function mostrarSlides(valorPrevNext) 
{

    let i;
    let slides = document.getElementsByClassName("slides-quadras");

    if (valorPrevNext > slides.length)
    { 
            
        slideIndex = 1 
        
    }

    if (valorPrevNext < 1) 
    { 

        slideIndex = slides.length 
        
    }

    for (i = 0; i < slides.length; i++) 
    {

        slides[i].style.display = "none";

    }

    slides[slideIndex - 1].style.display = "block";
        
}

const popup = document.getElementById("popup-reserva");
const overlay = document.querySelector(".overlay"); 

function abrirPopup() 
{

    popup.classList.remove("fechando");
    popup.classList.add("ativo"); 

}

function fecharPopup() {
    const popups = document.querySelectorAll(".popup.ativo");

    popups.forEach(popup => {

        popup.classList.add("fechando");

        setTimeout(() => {
            popup.classList.remove("ativo");
            popup.classList.remove("fechando");
        }, 300);

    });

}

function selectPayment(btn) 
{

    document.querySelectorAll('.payment-btn').forEach(b => b.classList.remove('selecionado'));

    btn.classList.add('selecionado');

}

function abrirPopupAvaliacao() {

    document.getElementById('popup-avaliacao').classList.add('ativo');

}

function fecharPopupAvaliacao() {

    document.getElementById('popup-avaliacao').classList.remove('ativo');

}

document.getElementById('imagem-upload').addEventListener('change', function (event) {

    const file = event.target.files[0];
    const previewContainer = document.getElementById('preview-imagem');
    previewContainer.innerHTML = '';

    if (file && file.type.startsWith('image/')) 
    {

        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        previewContainer.appendChild(img);

    } 

    else
    {
        previewContainer.innerText = 'Formato inválido';
    }

});

window.abrirPopupAvaliacao = function() {
  document.getElementById('popup-avaliacao').classList.add('ativo');
}

window.fecharPopupAvaliacao = function() {
  document.getElementById('popup-avaliacao').classList.remove('ativo');
}

document.addEventListener('DOMContentLoaded', () => {
  const inputImagem = document.getElementById('imagem-upload');
  const nomeArquivo = document.getElementById('nome-arquivo');
  const preview = document.getElementById('preview-imagem');
  const botaoEnviar = document.getElementById('btn-enviar');
  const mensagem = document.getElementById('mensagem-enviada');

  inputImagem.addEventListener('change', () => {
    const file = inputImagem.files[0];
    if (file) {
      nomeArquivo.textContent = file.name;

      const reader = new FileReader();
      reader.onload = function(e) {
        preview.innerHTML = `<img src="${e.target.result}" alt="Imagem enviada">`;
      };
      reader.readAsDataURL(file);
    } else {
      nomeArquivo.textContent = 'Nenhum arquivo selecionado';
      preview.innerHTML = '';
    }
  });

  botaoEnviar.addEventListener('click', () => {
    mensagem.style.display = 'block';

    setTimeout(() => {
      mensagem.style.display = 'none';
      document.getElementById('comentario').value = '';
      nomeArquivo.textContent = 'Nenhum arquivo selecionado';
      preview.innerHTML = '';
      inputImagem.value = '';
      document.querySelectorAll('input[name="estrela"]').forEach(e => e.checked = false);
    }, 3000);
  });

  window.fecharPopupAvaliacao = function() {
    document.getElementById('popup-avaliacao').style.display = 'none';
  };
});
