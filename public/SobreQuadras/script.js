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
