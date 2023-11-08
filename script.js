'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// Open the modal window. Using CSS manipulation.
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Close the modal window. Using CSS manipulation.
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Add event listener for each of the buttons:
btnsOpenModal.forEach( btn => btn.addEventListener('click' , openModal) );


// Add event listenet for closing the modal -> If the user press on X button or on the overlay : the modal window will be close
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Add event listener for closing the modal when the user press Esc button.
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//////////////////////////////////////////////////////////
// Declarations:

// Scroll To Button
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinkContainer = document.querySelector('.nav__links');

// Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabbedContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

// Fade nav bar
const navBar = document.querySelector('.nav');

// Sticky navigation : Intersection Observer API
const header = document.querySelector('.header');







//////////////////////////////////////////////////////////
// Scroll To Button


// Scroll to section 1 when press on the btnScrollTo button. ("Learn more" button).
const scrollToSection = btnScrollTo.addEventListener('click' , function()
{
  section1.scrollIntoView( {behavior: 'smooth' } );
})


// 1. Add Event Listener to COMMON PARENT element.
// 2. Determine what element originated the event.   (Using e.target)
navLinkContainer.addEventListener('click' , function(e)  // COMMON PARENT element
{
  e.preventDefault();

  // If the element that originated the event have a 'nav__link' class -> If the element is a link inside the nav link container:
  if(e.target.classList.contains('nav__link') )                                   
  {
    // Smooth Scroll to the specific place.
    const id = e.target.getAttribute('href');                                 // In the HTML , There is a match between the id and the href link.
    document.querySelector(id).scrollIntoView( {behavior: 'smooth' } );       // Smooth scroll to the speicif id.
  }

})

//////////////////////////////////////////////////////////
// Tabbed Component


// 1. Add Event Listener to COMMON PARENT element.
// 2. Determine what element originated the event.   (Using e.target)
tabbedContainer.addEventListener('click' , function(e)
{
  e.preventDefault();

  // Make sure that if we press everyplace INSIDE the button, we get the button itself and not anything else (like the span element).
  const clicked = e.target.closest('.operations__tab');

  // Guard clause.
  if (!clicked) return;

  // Active tab.
  tabs.forEach( t => t.classList.remove('operations__tab--active') );  // Remove the active class from all the tabs.
  clicked.classList.add('operations__tab--active');                    // Add the active class to the tab that clicked.

  // Activate content.
  tabContent.forEach( c => c.classList.remove('operations__content--active') );                                                      // Remove the active class from all the tabs.
  document.querySelector(`.operations__content--${clicked.getAttribute(`data-tab`)}`).classList.add('operations__content--active');  // Add the active class to the tab that clicked.


})

/////////////////////////////////////////////////////////////
// Fade nav bar


const handleNavnarHover = function( e , opacity )
{
  if (e.target.classList.contains('nav__link'))
  {
    const link = e.target;
    const silbling = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');

    silbling.forEach( el => 
      {
        if (el !== link) el.style.opacity = opacity;
        
      })
    logo.style.opacity = opacity;
  }
}


navBar.addEventListener('mouseover' , function(e)
{
  handleNavnarHover(e , 0.5);
})


navBar.addEventListener('mouseout' , function(e)
{
  handleNavnarHover(e , 1);
})


/////////////////////////////////////////////////
// Sticky navigation : Intersection Observer API
// We want to add a sticky navigation when the header section is no longer visibale.

const navHeight = navBar.getBoundingClientRect().height;


// This function will get called each time that the obsevered element [Observer.observer(obsevered element)] is intersecting the root element at the threshold we define.
// This function get entries as paramater. (Array of entries)
// For each time we get an entry -> something happand.
const stickyNavbar = function(entries)
{
  const entry = entries[0];                        // One threshold so one entry.
  if ( !entry.isIntersecting) navBar.classList.add('sticky');
  else navBar.classList.remove('sticky');
  
}

const observerOptions = 
{
  root: null,                     // null => watching the full viewport.
  threshold: 0,                   // the precentage of the item we observe for.  0 = completly dissapear from the view | 1 = completley appear in the view.
  rootMargin: `-${navHeight}px`,
}


const headerObserver = new IntersectionObserver( stickyNavbar , observerOptions);
headerObserver.observe(header);



/////////////////////////////////////////////////
// Revealing Sections on scrolls : Intersection Observer API

const allSections = document.querySelectorAll('.section');


const revealSection = function( entries , observer )
{
  const entry = entries[0];                     // One threshold so one entry.

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  serctionObserver.unobserve(entry.target);
}

const obsOptions = 
{
  root: null,
  threshold: 0.15              // When the observer is 15% visible.
};

const serctionObserver = new IntersectionObserver( revealSection ,obsOptions );


// Loop over the array of the sections and observe all of them + hide them.
allSections.forEach( function(section)
{
  serctionObserver.observe( section );
 // section.classList.add('section--hidden');

})


///////////////////////////////////////////
// Lazy Loading Images: Intersection Observer API


// Save all the high resulusion pictures.
const highResImages = document.querySelectorAll('img[data-src]');


const loadImg = function(entries , observer)
{
   const entry = entries[0];                   // One threshold so one entry.

   if (!entry.isIntersecting) return;

   // Replace src with data-src.
   entry.target.src = entry.target.dataset.src;


   // Event listener will execute only when the picutre is load. Good for users with slow internet connection.
   entry.target.addEventListener('load' , function()
   {
     entry.target.classList.remove('lazy-img');
   })

   imageObserver.unobserve(entry.target);
};

const imgObserverOptions = 
{
  root: null,
  threshold: 0,
  rootMargin: '200px'
}

const imageObserver = new IntersectionObserver( loadImg , imgObserverOptions );


highResImages.forEach( img => 
  imageObserver.observe(img)); 


///////////////////////////////////////////
// Slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slider = document.querySelector('slider');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length;


///////
// Functions:


// Create dot for each slide
const createDots = function()
{
  slides.forEach( function( _ , i )
  {
    dotContainer.insertAdjacentHTML('beforeend' , 
    `<button class="dots__dot" date-slide="${i}"> </button>`);
  } )
}

// Activate the slide dot.
const activateDot = function(slide)
{
  document.querySelectorAll('.dots__dot').forEach( dot => dot.classList.remove('dots__dot--active'));

 document.querySelector(`.dots__dot[date-slide="${slide}"] `).classList.add('dots__dot--active');

}

// Function to move slides.
const goToSlide = function(slide)
{
  slides.forEach( (s , i) => s.style.transform = `translateX(${100 * (i-slide)}%)` );
}


const init = function()
{
  goToSlide(0);
  createDots();

  activateDot(0);
}


const nextSlide = function()
{
  if (currentSlide === maxSlide -1)  currentSlide = 0;  // If currentslide = maxSlide -> There is no slide on the right.
  else currentSlide++;

  goToSlide(currentSlide);
  activateDot(currentSlide);
}

const previousSlide = function()
{
  if(currentSlide === 0) currentSlide = maxSlide - 1;  // If currentslide = 0 -> There is no slide on the left.
  else currentSlide --;
  
  goToSlide(currentSlide);
  activateDot(currentSlide);
}

init();

// Adding Events Listener
btnRight.addEventListener('click' , nextSlide);
btnLeft.addEventListener('click' , previousSlide);

dotContainer.addEventListener('click' , function(e)
{
  if (e.target.classList.contains('dots__dot'))
  {
    const slide = e.target.getAttribute('date-slide');
    goToSlide(slide);
    activateDot(slide);
    // console.log(`Dot of slide number ${e.target.getAttribute('date-slide')}`);
  }
})