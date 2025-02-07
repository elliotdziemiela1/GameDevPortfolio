// returns the section directly below 300px below the navbar
function findSectionToHighlight(){
    navbar = document.querySelector("nav");
    navBottom = (navbar.getBoundingClientRect()).bottom + 300; // 200px below navbar

    sections = document.querySelectorAll('section')
    for (let section of sections){
        sectBottom = (section.getBoundingClientRect()).bottom;
        if (sectBottom >= navBottom){ // find the first section whose bottom is below 200px below navbar
            return section;
        }
    }
}

// given a section of the page, finds the link in the navbar corresponding to it 
// and highlights
function highlightNavbarLink(section){
    navbar = document.querySelector("nav");
    sectionID = section.getAttribute('id');

    // remove highlight from links from previous scroll events
    links = navbar.querySelectorAll("a");
    for (let link of links){
        link.classList.remove("active-link");
    }

    activeLink = navbar.querySelector(`a[href="#${sectionID}"]`);
    activeLink.classList.add('active-link');

}

// main function to find current section and highlight it
function updateNavbarHighlight() {
    // if were at the bottom of the page, highlight the last navbar link
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
        highlightNavbarLink(document.getElementById('About'));
    else {
        const sectionBelowNavbar = findSectionToHighlight();
        highlightNavbarLink(sectionBelowNavbar);
    }
}

// resizes the navbar based on scroll position
function resizeNavbar() {
    // if we've scrolled past 110 pixels, decrease the navbar padding and 
    // shrink the logo/links
    if (document.documentElement.scrollTop > 100){
        document.querySelector("nav").style.padding = "10px 20px";
        document.querySelector(".logo").classList.remove("larger-logo");
        document.querySelector(".logo").classList.add("smaller-logo");
        links = document.querySelectorAll("nav a");
        for (let link of links){
            link.classList.remove("larger-link")
            link.classList.add("smaller-link")
        }
    } else if (document.documentElement.scrollTop > 80){
        document.querySelector("nav").style.padding = "15px 20px";
    } else if (document.documentElement.scrollTop > 60){
        document.querySelector("nav").style.padding = "20px 20px";
    } else if (document.documentElement.scrollTop > 40){
        document.querySelector("nav").style.padding = "25px 20px";
    } else {
        document.querySelector("nav").style.padding = "30px 20px";
        document.querySelector(".logo").classList.remove("smaller-logo");
        document.querySelector(".logo").classList.add("larger-logo");
        links = document.querySelectorAll("nav a");
        for (let link of links){
            link.classList.remove("smaller-link")
            link.classList.add("larger-link")
        }
    }
}


currentSlide = 0;
slides = document.querySelectorAll(".slides img");
// function that changes the visible slide for the carousel given a direction 
// either 1 (forwards) or -1 (backwards)
function changeSlide(dir){
    // hide all slides
    for (let slide of slides){
        slide.classList.add("inactiveSlide")
        slide.classList.remove("activeSlide")
    }
    
    currentSlide += dir;
    if (currentSlide >= slides.length)
        currentSlide = 0;
    else if (currentSlide < 0)
        currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add("activeSlide")

}

// activates the modal specified by n (1 through 3 in this case)
// by changing it's class list and playing the video
function displayModal(n){
    modalContent = document.querySelector(`.modalContent${n}`);
    video = document.querySelector(`.modalContent${n} video`);
    video.play();
    modalContent.classList.remove("inactiveModal")
    modalContent.classList.add("activeModal");
}

// deactivates the modal specified by n (1 through 3) by changing
// its classlist and pausing the video
function closeModal(n){
    modalContent = document.querySelector(`.modalContent${n}`);
    video = document.querySelector(`.modalContent${n} video`);
    video.pause();
    modalContent.classList.remove("activeModal")
    modalContent.classList.add("inactiveModal");
}


// Ensure the DOM is fully loaded before attaching the scroll event listener
document.addEventListener('DOMContentLoaded', () => {
    // Call the update function on scroll
    window.addEventListener('scroll', updateNavbarHighlight);
    window.addEventListener('scroll', resizeNavbar)
    // On-click events
    document.querySelector(".prev").addEventListener('click', function(){
        changeSlide(-1);
    });
    document.querySelector(".next").addEventListener('click', function(){
        changeSlide(1);
    });
    document.querySelector("#openModalButton1").addEventListener('click', function() {
        displayModal(1);
    });
    document.querySelector("#closeModalButton1").addEventListener('click', function() {
        closeModal(1);
    });
    document.querySelector("#openModalButton2").addEventListener('click', function() {
        displayModal(2);
    });
    document.querySelector("#closeModalButton2").addEventListener('click', function() {
        closeModal(2);
    });
    document.querySelector("#openModalButton3").addEventListener('click', function() {
        displayModal(3);
    });
    document.querySelector("#closeModalButton3").addEventListener('click', function() {
        closeModal(3);
    });

    // change link scrolling to scroll to just above section
    document.querySelectorAll('.navLink').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
    
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            const offset = 40; 
            const navbarHeight = document.querySelector('nav').offsetHeight; // Get the height of the navbar if needed
            
            // Scroll the page with smooth behavior and the custom offset
            window.scrollTo({
                top: targetElement.offsetTop - navbarHeight - offset,
                behavior: 'smooth'
            });
        });
    });

    // Initial calls on page load
    changeSlide(0);
    updateNavbarHighlight();
    resizeNavbar();
});


