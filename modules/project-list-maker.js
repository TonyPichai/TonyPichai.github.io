// PROJECTS PAGE 
// Project list and page generation
export async function createProjectList(jsonData) {
    const listElement = document.getElementById('projectListID');
    const listItemPromises = jsonData.map( obj => createListItems(jsonData, obj, listElement));
    await Promise.all(listItemPromises);

    // const cats = document.getElementById('categories');
    // adjustCategoryDisplay(cats, 'hidden');
}


function createListItems(jsonData, obj, listElement) {

    const URLString = window.location.search;
    // Call the URL parameter search method
    const URLParameter = new URLSearchParams(URLString);
    const retrievedObjectIndex = URLParameter.get('index');
    console.log('Retrieved parameter:', retrievedObjectIndex);

    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
  
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');
  
    const titleElement = document.createElement('h3');
    titleElement.textContent = obj.title;
    itemContainer.appendChild(titleElement);
  
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = obj.description;
    itemContainer.appendChild(descriptionElement);
  
    listItem.appendChild(itemContainer);
    listElement.appendChild(listItem);

    // On list item selection
    if (retrievedObjectIndex != null) {
        console.log('object retrieved is:', jsonData[retrievedObjectIndex].title);
        const objIndex = jsonData[retrievedObjectIndex];
        projectContentFromIndex(objIndex);
    }


    // Add a listener with on click even
    listItem.addEventListener('click', () => {
        generateProjectContent();
    });


// On list item selection...
function generateProjectContent() {
    
    // const name = document.getElementById('nameID');
    // name.style.color = 'rgb(255, 255, 255)';

    const nav = document.getElementById('navID');
    const listItems = nav.querySelectorAll('li');
    listItems.forEach(item => {
        item.classList.add('white-text');
        item.style.textDecoration = 'none';
        item.style.color = 'white';
        console.log('style change');
    });
    
    const listSection = document.getElementById('projectMenuID');
    listSection.style.display = 'none';

    const cats = document.getElementById('categories');
    // cats.style.display = 'block';
    const catStyle = adjustCategoryDisplay(cats);
    cats.style.display = catStyle;


    // Reveal project grid
    const projectGridContainer = document.getElementById('gridContainer');
    projectGridContainer.style.display = 'grid';
    const hero = document.getElementById('hero');
    hero.style.display = 'block';

    // POPULATE HERO
    const heroImgContainer = document.getElementById('heroImageContainer');
    heroImgContainer.innerHTML = '';
    const heroImage = new Image();
    heroImage.classList.add('hero-image');
    heroImage.src = obj.mainImage;
    heroImgContainer.appendChild(heroImage);
    const heroTitle = document.getElementById('heroTitle');
    heroTitle.innerHTML = obj.title;
    const heroSubtitle = document.getElementById('heroSubtitle');
    heroSubtitle.innerHTML = obj.subtitle;

    // Populate main article
    const projectType = document.getElementById('projectType');
    projectType.innerHTML = obj.projectType;
    const associate = document.getElementById('associate');
    associate.innerHTML = obj.association;
    
    const roles = document.getElementById('roles');
    roles.innerHTML = obj.roles;
    const technology = document.getElementById('technology');
    technology.innerHTML = obj.technology;
    const mainText = document.getElementById('articleText');
    mainText.innerHTML = '';
    mainText.innerHTML = obj.mainText;
}

// After using HTTP query to get the index varibale ...
function projectContentFromIndex(objIndex) {
    // const name = document.getElementById('nameID');
    // name.style.color = 'rgb(255, 255, 255)';

    const nav = document.getElementById('navID');
    const listItems = nav.querySelectorAll('li');
    listItems.forEach(item => {
        item.classList.add('white-text');
        item.style.textDecoration = 'none';
        item.style.color = 'white';
        console.log('style change');
    });

    const listSection = document.getElementById('projectMenuID');
    listSection.style.display = 'none';

    const cats = document.getElementById('categories');
    // cats.style.display = 'block';
    const catStyle = adjustCategoryDisplay(cats);
    cats.style.display = catStyle;

    // Reveal project grid
    const projectGridContainer = document.getElementById('gridContainer');
    projectGridContainer.style.display = 'grid';
    const hero = document.getElementById('hero');
    hero.style.display = 'block';

    // POPULATE HERO
    const heroImgContainer = document.getElementById('heroImageContainer');
    heroImgContainer.innerHTML = '';
    const heroImage = new Image();
    heroImage.classList.add('hero-image');
    heroImage.src = objIndex.mainImage;
    heroImgContainer.appendChild(heroImage);
    const heroTitle = document.getElementById('heroTitle');
    heroTitle.innerHTML = objIndex.title;
    const heroSubtitle = document.getElementById('heroSubtitle');
    heroSubtitle.innerHTML = objIndex.subtitle;

    // Populate main article
    const projectType = document.getElementById('projectType');
    projectType.innerHTML = objIndex.projectType;
    const associate = document.getElementById('associate');
    associate.innerHTML = objIndex.association;
    
    const roles = document.getElementById('roles');
    roles.innerHTML = objIndex.roles;
    const technology = document.getElementById('technology');
    technology.innerHTML = objIndex.technology;
    const mainText = document.getElementById('articleText');
    mainText.innerHTML = '';
    mainText.innerHTML = objIndex.mainText;
}
    // PARALLAX SCROLL 
function positionHeroText () {
    var parallaxElement = document.getElementById('heroTextContainer');
    var initialPosition = parallaxElement.getBoundingClientRect().top;
    var containerHeight = parallaxElement.parentElement.clientHeight;
    var maxTranslation = containerHeight * 0.5;

    window.addEventListener('scroll', function() {
      // Parallax effect calculation
      let scrollPosition = window.pageYOffset;
      let parallaxSpeed = 0.2; // Adjust this value for the desired parallax effect
      console.log('Initial position:', initialPosition);
      var translation = scrollPosition * parallaxSpeed;
      var newPosition = initialPosition + translation;

      // limit the movement
      newPosition = Math.max(-maxTranslation, Math.min(0, newPosition));
      console.log('Translation:', translation);
      console.log('New Position:', newPosition);
      parallaxElement.style.transform = 'translateY(' + newPosition + 'px)';
    });
  }}

function adjustCategoryDisplay(display) {
  const windowWidth = window.innerWidth;
  if (display === 'hidden') {
    return;
  }
  else if (windowWidth < 600) {
      return 'block';
  } else {
      return 'inline-flex';
  }
}

// Add a resize event listener to trigger the adjustment on window resize
window.addEventListener('resize', adjustCategoryDisplay);
