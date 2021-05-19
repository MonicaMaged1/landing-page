/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const mySections = document.querySelectorAll('section');
const navigationBar = document.getElementById("navbar__list");
const fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
let addListItems = (sections) => {
    sections.forEach(function(element) {
        //get the data of the current section
        const title = element.getAttribute("data-nav");
        const dataRef = "#"  + title.replace(" ", "").toLowerCase();

        //create a new item to be added to the list
        const menuItem = document.createElement("li");

        //create an anchor and add it to the list item
        const ref = document.createElement("a");
        ref.setAttribute("href", dataRef);
        ref.textContent = title;
        ref.style.color = "#fff";
        menuItem.appendChild(ref);

        //set the styling of the menu items
        menuItem.classList.add("menu__link");

        //append each item to the fragment
        fragment.appendChild(menuItem);

    });
    navigationBar.appendChild(fragment);
}

let scrollToSection = () => {
    //get a list of all items
    const listItems = document.querySelectorAll("li");

    //loop over each item to add an event listener
    listItems.forEach((item)=>{
        item.addEventListener("click", (e)=> {
            //prevent any default actions for the event
            e.preventDefault();

            //save the ID you want to scroll to
            const idRef = item.firstChild.getAttribute("href");            
            document.querySelector(idRef).scrollIntoView({behavior: "smooth", inline: "nearest"});
        } );
    });

}

//returns true if the passed element is within the visible window
let isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -50 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

let activateSectionWhenScrolling = (sections) => {
    //get list of all anchors
    const anchors = document.querySelectorAll("a");

    //listen whenever page is scrolled
    document.addEventListener("scroll", ()=> {
        sections.forEach((section)=>{

            //if the top of the section is within the view, mark it
            //if(rect.top >= 0 && rect.top < 400){
            if(isInViewport(section)){
                section.classList.add("your-active-class");

                //change the color of the list's items depending on the viewed section
                anchors.forEach((anchor)=>{
                    if (anchor.innerText == section.getAttribute("data-nav")){
                        anchor.style.color = "#cc1";
                    }
                    else {
                        anchor.style.color = "#fff";
                    }
                })
            }
            else{
                section.classList.remove("your-active-class");
            }
        })
    });

}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
addListItems(mySections);

// Add class 'active' to section when near top of viewport
activateSectionWhenScrolling(mySections);

// Scroll to anchor ID using scrollTO event
scrollToSection();

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


