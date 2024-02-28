import { createProjectList } from './modules/project-list-maker.js';
import { populateGalleryContainer } from './modules/gallery-maker.js';

// The header file linking the other js files to the page

// 1. GETTING data form content.json
// 2. Handle json data as a variable
// 3. Pass variable to other functions as needed 
async function generatePageContent() {
    // Network request, get your json data
    try {
        // Get data as string and convert to usable json

        // Local file path
        // const response = await fetch('modules/content.json');
        // Github file path!!!
        const response = await fetch('/modules/content.json');

        const jsonData = await response.json(); // Convert string to json

        await scriptSelector(jsonData);

    }
    catch (error) {
        console.error('unable to access content:', error);

        setTimeout(() => {
        window.location.reload();
        }, 1000); 
        // window.location.href = 'index.html';
    }
}


// %%% Which script file to execute? %%%
//  Using determineCurrentPage()
//  Identify the page from the url/filepath

async function scriptSelector(jsonData, galleryGrid) {

    // Get the result of the arrow function.
    // ONLY THEN can the value be used in the comparison operator
    const currentPageResult = currentPage(); 

    if (currentPageResult === 'projects') {
      await createProjectList(jsonData);
      console.log('projects page');

    } else if (currentPageResult === 'index') {
        await populateGalleryContainer(jsonData, galleryGrid);
      console.log('index page');

    } else if (currentPageResult === 'about') {
      console.log('about page');

    } else if (currentPageResult === 'sketchbook') {
      console.log('sketchbook page');
    }
}


function currentPage() {
    const pathname = window.location.pathname;
    if (pathname.includes('/projects.html')) {
        return 'projects';
    } else if (pathname.includes('/index.html')) {
        return 'index';
    } else if (pathname.includes('/about.html')) {
        return 'about';
    }
    else if (pathname.includes('/sketchbook.html')) {
        return 'sketchbook';
    }
        return 'unknown';
}; 
generatePageContent();

function closeModal() {
    const modalCheckbox = document.getElementById("burger-button");
    const brgClose = document.querySelector(".burger-nav-icon");

    // Function to open or close the modal by toggling the checkbox's checked state
    // Timeout to deal with timing issue between css animation for checked state with JS setting the css checked state
    function toggleModal() {
        setTimeout(() => {
            modalCheckbox.checked = !modalCheckbox.checked;
        }, 10);
    }
    // Function for close btn
    function close(event) {
        if (modalCheckbox.checked && !modalCheckbox.contains(event.target)) {
            toggleModal(); // Toggle the modal to close
            console.log('close button');
        }
    }
    // Function to close the modal when clicking outside of the modal
    function closeOnOutsideClick(event) {
        if (modalCheckbox.checked && !modalCheckbox.contains(event.target)) {
            toggleModal(); // Toggle the modal to close
            console.log('off click close');
        }
    }

    // Add event listeners
    brgClose.addEventListener('click', close);
    document.addEventListener('click', closeOnOutsideClick);
}
closeModal();


function nameNav() {
    const name = document.getElementById("nameID")
    name.addEventListener('click', (event) => {           
        window.location.href = 'index.html';
    })
}
nameNav();


