// if (sessionStorage.getItem('animarEntrada')) 
// {

//   document.documentElement.classList.add('entrada');
//   sessionStorage.removeItem('animarEntrada');

// }

window.addEventListener('load', function () 
{

    document.body.classList.add('fade-in');

});

document.querySelectorAll('.link-navbar').forEach(link => 
{

    link.addEventListener('click', function (e) 
    {

        e.preventDefault();
        document.body.classList.add('fade-animacao');

        setTimeout(() => 
        {

            window.location.href = this.href;

        }, 800);

    });

});