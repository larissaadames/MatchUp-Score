function selectPayment(button) {
    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
}

function fecharPopup() {
    const popup = document.getElementById('popup-reserva');
    popup.style.display = 'none';
}

document.getElementById('popup-reserva').style.display = 'flex';
