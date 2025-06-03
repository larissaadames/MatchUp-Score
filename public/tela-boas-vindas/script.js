document.querySelectorAll('.link-navbar').forEach(link => 
{

    link.addEventListener('click', function(e) 
    {
        e.preventDefault();
        sessionStorage.setItem('animarEntrada', 'true'); 
        document.body.classList.add('fade-animacao');

        setTimeout(() => 
        {

            window.location.href = this.href;

        }, 800); 

    });

});
