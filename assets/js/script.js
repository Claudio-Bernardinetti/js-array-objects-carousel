/* Consegna:
Riprendiamo il live coding visto in classe un pó di tempo fá sul carosello di immagini e rifacciamolo :scream_cat:, questa volta usando gli oggetti.

:boolean-hug: Potete prendere come riferimento il codice scritto insieme nel live, che troverete direttamente nella mia repository di github a questo link: [https://github.com/fabiopacifici/104_js/tree/main/live_slider]
Modifichiamo il codice dell'esercizio per renderlo funzionante con un array di oggetti al posto di un array di stringhe.

Bonus 0:
Non eramamo ancora a conoscenda di molti strumenti utili, come ad esempio le funzioni. É possibile fare refactoring del codice, pulendolo e creando quanche funzione che possa rendere tutto piú leggibile e pulito?

Bonus 1:
Sperimentiamo attraverso l'uso delle timing functions anche una funzionalità di scorrimento al nostro carosello:
al click di un bottone o già dall'inizio possiamo far partire, ad intervalli di tempo a piacere, lo scorrimento delle immagini disponibili nel carosello stesso.

Bonus 2:
E se volessi un bottone per invertire la "direzione" del carosello? */


const slides = [
    {
        animal: 'Aquila',
        sequence: 1,
        photo: './assets/img/zdenek-machacek-3zf2dD36Tms-unsplash.jpg'
    },
    {
        animal: 'Scimmia',
        sequence: 2,
        photo: './assets/img/manas-manikoth-xmFMjMT6OdQ-unsplash.jpg'
    },
    {
        animal: 'Cane',
        sequence: 3,
        photo: './assets/img/nikolaos-anastasopoulos-2BEAifRhETo-unsplash.jpg'
    },
    {
        animal: 'Ape',
        sequence: 4,
        photo: './assets/img/nikolett-emmert-tuQGZ6U7P2A-unsplash.jpg'
    },
    {
        animal: 'Pecora',
        sequence: 5,
        photo: './assets/img/alex-lvrs-1WOY5Pj1KqU-unsplash.jpg'
    },
    
];

let activeSlide = 0;

const sliderImagesEl = document.querySelector('.slider .images');
const thumbsElement = document.querySelector('.thumbnails');
const nextEl = document.querySelector('.next');
const prevEl = document.querySelector('.prev');

function createSlides() {
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        
        // for each slide we create the markup
        const slideMarkup = `
                                <div class="card ${activeSlide === i ? 'active' : '' }">
                                    <div class="cardHead">
                                        <img src="${slide.photo}" alt="" style="height: 553px; width: 400px;">
                                    </div>
                                    <div class="cardBody">
                                        <h3>${slide.animal}</h3>
                                        <p>${slide.sequence}</p>
                                    </div>
                                </div>
                            `
        
        sliderImagesEl.insertAdjacentHTML("beforeend", slideMarkup)
    }
}
function createThumbnails() {
    for (let i = 0; i < slides.length; i++) {
      const thumbPath = slides[i].photo;
      const thumbMarkup = `<img class="thumb ${activeSlide === i ? 'active' : ''}" src="${thumbPath}" alt="">`
  
      thumbsElement.insertAdjacentHTML('beforeend', thumbMarkup)
    }
}


const slideInfoEl = document.querySelector('.slide_info');


function updateActiveSlide(newActiveSlide) {
    // select the current slide
    const currentSlide = document.querySelectorAll('.slider .images .card')[activeSlide];
    
    // remove the active class from the current slide
    currentSlide.classList.remove('active');
    
    // select the active thumb
    const currentThumb = document.querySelector('.thumbnails > img.active');
    
    // remove the active class from the active thumb
    currentThumb.classList.remove('active');
    
    activeSlide = newActiveSlide;
    
    // select the next slide
    const nextSlide = document.querySelectorAll('.slider .images .card')[activeSlide];
    
    // // add the active class to the next slide
     nextSlide.classList.add('active');
    
    // select the next thumb
    const nextThumb = document.querySelectorAll('.thumb')[activeSlide];
    
    // add to the next thumb the active class
    nextThumb.classList.add('active');
    
    // update the slide info text
    //console.log(slideInfoEl);
    //slideInfoEl.textContent = `${slides[activeSlide].animal}  ${slides[activeSlide].sequence}`;
    
}

createSlides();
createThumbnails();

const slideInterval = 3000;
let autoSlideInterval;

// Crea una funzione per far scorrere automaticamente le slide
function autoSlide() {
    let newActiveSlide;
    if (activeSlide === slides.length - 1) {
        newActiveSlide = 0;
    } else {
        newActiveSlide = activeSlide + 1;
    }
    updateActiveSlide(newActiveSlide);
}

nextEl.addEventListener('click', function() {
    // Avvia lo scorrimento automatico delle slide
    autoSlideInterval = setInterval(autoSlide, slideInterval);
});



  
// Crea una funzione per far scorrere automaticamente le slide indietro
function autoSlideBack() {
    let newActiveSlide;
    if (activeSlide === 0) {
        newActiveSlide = slides.length - 1;
    } else {
        newActiveSlide = activeSlide - 1;
    }
    updateActiveSlide(newActiveSlide);
}

prevEl.addEventListener('click', function() {
    // Se esiste già un intervallo, lo cancella prima di crearne uno nuovo
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    // Avvia lo scorrimento automatico delle slide all'indietro
    autoSlideInterval = setInterval(autoSlideBack, slideInterval);
});
 



    

