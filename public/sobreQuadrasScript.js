let slideIndex = 1;
mostrarSlides(slideIndex);

function proximoSlide(valorPrevNext) {

    mostrarSlides(slideIndex += valorPrevNext);

}

function mostrarSlides(valorPrevNext) {

    let i;
    let slides = document.getElementsByClassName("slides-quadras");

    if (valorPrevNext > slides.length) {
        slideIndex = 1
    }

    if (valorPrevNext < 1) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";

}

const popupReservaOverlay = document.getElementById("popup-reserva");

function abrirPopup() {
    
    popupReservaOverlay.classList.remove("fechando");
    popupReservaOverlay.classList.add("ativo");

}

function fecharPopup() {

    popupReservaOverlay.classList.add("fechando");

    setTimeout(() => {
        popupReservaOverlay.classList.remove("ativo");
        popupReservaOverlay.classList.remove("fechando");
    }, 300);

}

function selectPayment(btn) {

    document.querySelectorAll('.payment-btn').forEach(b => b.classList.remove('selecionado'));
    btn.classList.add('selecionado');

}

const overlayAvaliacao = document.getElementById('overlay-avaliacao');

function abrirPopupAvaliacao() {

    overlayAvaliacao.classList.remove('fechando');
    overlayAvaliacao.classList.add('ativo');

}

function fecharPopupAvaliacao() {
    overlayAvaliacao.classList.add('fechando');

    setTimeout(() => {
        overlayAvaliacao.classList.remove('ativo');
        overlayAvaliacao.classList.remove('fechando'); 
    }, 300); 
}

document.getElementById('imagem-upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById('preview-imagem');
    const nomeArquivoSpan = document.getElementById('nome-arquivo');
    previewContainer.innerHTML = '';

    if (file && file.type.startsWith('image/')) {

        nomeArquivoSpan.textContent = file.name; 
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        previewContainer.appendChild(img);

    } 
    
    else {

        nomeArquivoSpan.textContent = 'Nenhum arquivo selecionado';
        previewContainer.innerText = 'Formato inválido ou nenhum arquivo selecionado';

    }
    
});

document.addEventListener('DOMContentLoaded', () => 
{

    const inputImagem = document.getElementById('imagem-upload');
    const nomeArquivo = document.getElementById('nome-arquivo');
    const preview = document.getElementById('preview-imagem');
    const botaoEnviar = document.getElementById('btn-enviar');
    const mensagem = document.getElementById('mensagem-enviada');

    const botaoAbrirAvaliacao = document.querySelector('.botao-avaliar-quadra');
    if (botaoAbrirAvaliacao) {
        botaoAbrirAvaliacao.addEventListener('click', abrirPopupAvaliacao);
    }

    if (botaoEnviar) {
        botaoEnviar.addEventListener('click', () => {
            mensagem.style.display = 'block';

            setTimeout(() => {
                mensagem.style.display = 'none';
                document.getElementById('comentario').value = '';
                nomeArquivo.textContent = 'Nenhum arquivo selecionado';
                preview.innerHTML = '';
                inputImagem.value = '';
                document.querySelectorAll('input[name="estrela"]').forEach(e => e.checked = false);
                fecharPopupAvaliacao(); // Fecha o popup após o envio
            }, 3000);
        });
    }

    window.abrirPopupAvaliacao = abrirPopupAvaliacao;
    window.fecharPopupAvaliacao = fecharPopupAvaliacao;
    window.abrirPopup = abrirPopup; 
    window.fecharPopup = fecharPopup;

});