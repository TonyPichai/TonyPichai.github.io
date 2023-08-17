import { createProjectList } from './project-list-maker.js';
import { populateGalleryContainer } from './index-gallery-maker.js';

async function generatePageContent() {
    // Network request, get your json data
    try {
        // Get data as string and convert to usable json
        const response = await fetch('/modules/content.json');
        const jsonData = await response.json();

        // Get the gallery grid element
        const galleryGrid = document.getElementById('galleryAutoGrid');
        await scriptSelector(jsonData, galleryGrid);

        // hoverEffects();
    }
    catch (error) {
        console.error('unable to access content:', error);
    }
}

generatePageContent();

// Using keywords from determineCurrentPage();
// call appropriate function
// Don't forget! These functions all have their own context
// Remember to pass each function the appropriate elements and objects/data
async function scriptSelector(jsonData, galleryGrid) {
    const currentPage = determineCurrentPage(); 

    if (currentPage === 'projects') {
    //   await createProjectList(jsonData, listElement);
      await createProjectList(jsonData);
      console.log('projects page');

    } else if (currentPage === 'index') {
        // await createGalleryItems(jsonData, galleryGrid);
        await populateGalleryContainer(jsonData, galleryGrid);
      console.log('index page');

    } else if (currentPage === 'about') {
      console.log('about page');
    }
}


// Determine the current page and return keyword
function determineCurrentPage() {
    const pathname = window.location.pathname;
    if (pathname.includes('/projects.html')) {
        return 'projects';
    } else if (pathname.includes('/index.html')) {
        return 'index';
    } else if (pathname.includes('/about.html')) {
        return 'about';
    }
        return 'unknown';
}

// async function createProjectList(jsonData, listElement) {
//     await jsonData.forEach(obj => {
//         makeListItem(obj, listElement);
//     });
// } importing

// async function createGalleryItems(jsonData, galleryGrid) {
//     await jsonData.forEach(obj => {
//         makeGalleryItem(obj, galleryGrid);
//     });
// }