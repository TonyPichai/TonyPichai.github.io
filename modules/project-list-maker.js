// PROJECTS PAGE 
// Project list and page generation from content.json Array
export async function createProjectList(jsonData) {
    // iterate (map) over each element in jsonDat
    const listItemPromises = jsonData.map( obj => triggerPageBuilding(jsonData, obj));
    return Promise.all(listItemPromises);
}


// Add a popstate event listener for backwards navigation use case
window.addEventListener('popstate', () => {
    const currentURL = new URL(window.location.href);
    if (currentURL.searchParams.has('index')) {
        window.location.href = `projects.html`;
    }
});

// Generate iterations of the menu items
// The parameter being passed is an iteration being returned to the promise
function generateMenu(obj) {
    // console.log("%c generateMenu triggered", 'color: red');

    console.log('generated menu item:', obj.id); // Index values being correctly retrieved

    const projectMenu = document.getElementById('projectMenuID');
    const projectPageGrid = document.getElementById('gridContainer');
    projectMenu.style.display = 'flex';
    projectPageGrid.style.display = 'none';

    const menuElement = document.getElementById('projectListID');
    const menuItem = document.createElement('li');
    const itemContainer = document.createElement('div');
    const titleElement = document.createElement('h3');

    menuItem.classList.add('list-item');
    itemContainer.classList.add('item-container');

    titleElement.textContent = obj.title;

    itemContainer.appendChild(titleElement);
    menuItem.appendChild(itemContainer);
    menuElement.appendChild(menuItem);

    // Click eventListener on attributed listItem element
    // Generates project page building
    menuItem.addEventListener('click', () => {
        generatePage(obj);
        setURLQuery(obj);
    });
    
}

function displayMediaQuery() {
    console.log("%c displayMediaQuery triggered", 'color: red');

    const categories = document.getElementById('categories');
    const windowWidth = window.innerWidth;
  
    // When categories section is not there, do nothing
    // Else, if categories section is there, query window width & set display
    if (categories === 'hidden') {
      return;
    }
    else if (windowWidth < 600) {
        categories.style.display = 'block';
        createHero();
    } else {
        categories.style.display = 'inline-flex';
    }
}
function pathQueryOnMediaQuery() {
    const pathname = window.location.pathname;
    if (pathname.includes('/projects.html')) {
        window.addEventListener('resize', displayMediaQuery);
    } else {
        return
    }
}

// Create the categories section
function createCategories(obj) {
    console.log("%c createCategories triggered", 'color: red');

    const projectType = document.getElementById('projectType');
    const associate = document.getElementById('associate');
    const roles = document.getElementById('roles');
    const technology = document.getElementById('technology');

    projectType.innerHTML = obj.projectType;
    associate.innerHTML = obj.association;
    roles.innerHTML = obj.roles;
    technology.innerHTML = obj.technology;

    displayMediaQuery(obj); // Setting the display
}

// Create the hero section
const createHero = async (obj) => {
    console.log("%c createHero triggered", 'color: red');
    console.log('object ID is:', obj.id);

    const hero = document.getElementById('hero');
    const heroImgContainer = document.getElementById('heroImageContainer');
    const heroImage = new Image();
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');

    hero.style.display = 'block';
    heroImgContainer.innerHTML = '';
    heroImage.classList.add('hero-image');
    heroImage.src = obj.mainImage;
    heroImgContainer.appendChild(heroImage);
    
    heroTitle.innerHTML = obj.title;
    heroSubtitle.innerHTML = obj.subtitle;
}

// Send a new parameter to the URL
function setURLQuery(obj) {
    console.log("%c setURLQuery triggered", 'color: red');

    const projectIndex = obj.id;
    console.log("project index is:", projectIndex);
    const newURL = `projects.html?index=${projectIndex}`;
    window.location.href = newURL;

    // newURL.searchParams.set('index', projectIndex);
    // history.replaceState(null, '', newURL.toString());
}



// Get the URL param and return the index value = project selected
function getURLQuery() {
    console.log("%c getURLQuery triggered", 'color: red');

    // URL query on navigating from gallery page
    const retrieveURLQuery = window.location.search; // Retrieve and store URL query string
    const URLParameter = new URLSearchParams(retrieveURLQuery); // parse string to URLSearch.. object
    const retrievedObjectIndex = URLParameter.get('index'); // Use .get method on the URLSearch.. object to get the value of the parameter index

    console.log('Query string:', retrieveURLQuery);
    console.log('Retrieved parameter:', retrievedObjectIndex);

    return retrievedObjectIndex;
}

function generatePageFromIndex(jsonData) {
    console.log("%c generatePageFromIndex triggered", 'color: red');

    const indexRes = getURLQuery();

    // Generating the page from the URL query Index from the gallery
    // On list item selection
    if (indexRes != null) {
        console.log("indexRes !=null:", indexRes);
        console.log('object retrieved is:', jsonData[indexRes].title);
        const objIndex = jsonData[indexRes];
        generatePage(objIndex);
    }
}

const moveCarousel = (loadedImages) => {
    let currImg = 0;
    const carousel = document.getElementById("carouselImg");
    const left = document.getElementById("carouselLeft");
    const right = document.getElementById("carouselRight");

    left.addEventListener('click', () => {
        carousel.removeChild(loadedImages[currImg]);
      
        currImg = (currImg - 1 + loadedImages.length) % loadedImages.length;
        console.log('left:', currImg);
        carousel.appendChild(loadedImages[currImg]);
    });
    right.addEventListener('click', () => {
        carousel.removeChild(loadedImages[currImg]);

        currImg = (currImg + 1 + loadedImages.length) % loadedImages.length;
        console.log('right:', currImg);
        carousel.appendChild(loadedImages[currImg]);
    });
}

let imgFlag = false;

// Creating a carousel
function generateCarousel(obj) {
    const carouselImg = document.getElementById("carouselImg");
    const carousel = document.getElementById("articleCarousel");
    const galleryImages = obj.galleryImages; // The array
    const loadedImages = [];

    if (galleryImages && galleryImages.length > 0 ) {
        for(let i = 0; i < galleryImages.length; i++) {
            if (imgFlag === true) {
                return;
            }
            // per image basis
            const imageURL = galleryImages[i];
    
            const img = new Image();
            
            img.src = imageURL;
    
            // carousel.appendChild(img);
            // add to array
            loadedImages.push(img);
    
        }
        imgFlag = true;
    
        carouselImg.appendChild(loadedImages[0]);
        moveCarousel(loadedImages);
    } else {
        carousel.style = 'hidden';
        console.log('no images, hidden');
    }
   
};

// Generate project page content
// Triggered by eventListener 'click' on createListItem
let videoFlag = false;

const generatePage = async (obj) => {
    console.log("%c generatePage triggered", 'color: red');
    console.log('Object index parameter:', obj.id);

    const video = document.getElementById('articleVideo');
    const carousel = document.getElementById('articleCarousel');
    
    // Hide the projects menu
    const projectsMenu = document.getElementById('projectMenuID');
    projectsMenu.style.display = 'none';

    // Reveal project grid
    const projectGridContainer = document.getElementById('gridContainer');
    projectGridContainer.style.display = 'grid';

    // Populate main article
    const mainText = document.getElementById('articleText');
    mainText.innerHTML = '';

    const videoContainer = document.getElementById('articleVideo');

    // Paragraphs created by separating body with \n newline delimiter
    const paragraphs = obj.mainText.split('\n');

    // Create p elements for each paragraph
    paragraphs.forEach((paragraph) => {
        const pElement = document.createElement('p');
        pElement.textContent = paragraph;
        mainText.appendChild(pElement);
    });
    
    createCategories(obj);
    createHero(obj);
    
    if(obj.galleryImages != null){
        carousel.style.display = 'flex';
        generateCarousel(obj);
    } else {
        carousel.style.display = 'none';
    }

    let currVideo;

    if(obj.video !=null && !videoFlag) {
        video.style.display = 'block';
        currVideo = obj.video;
    } 

    //looking for video
    if (currVideo) {
        const iFrameVid = document.createElement('iFrame');

        iFrameVid.src = currVideo;
        iFrameVid.innerHTML="";
        iFrameVid.style.title = "vimeo-player"
        iFrameVid.style.frameborder = "0"
        iFrameVid.style.allowfullscreen = true;

        videoContainer.classList.add('video-container');
        videoContainer.appendChild(iFrameVid);

        videoFlag = true;
    };

}


// Creating the list of projects.
function triggerPageBuilding(jsonData, obj, listElement) {
    console.log("%c triggerPageBuilding triggered", 'color: red');

    generateMenu(obj,listElement);
    generatePageFromIndex(jsonData);

    console.log('Trigger: projectContentFromIndex');

}

pathQueryOnMediaQuery();


// MODAL MENU STYLE
// const nav = document.getElementById('navID');
// const listItems = nav.querySelectorAll('li');
// listItems.forEach(item => {
//     item.classList.add('white-text');
//     item.style.textDecoration = 'none';
//     item.style.color = 'white';
//     console.log('style change');
// });