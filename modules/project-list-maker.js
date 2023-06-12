// Project list and page generation
export async function createProjectList(jsonData) {
    const listElement = document.getElementById('projectListID');
    const listItemPromises = jsonData.map( obj => createListItems(jsonData, obj, listElement));
    return Promise.all(listItemPromises);
}

function createListItems(jsonData, obj, listElement) {

    const URLString = window.location.search;
    // Call the URL parameter search method
    const URLParameter = new URLSearchParams(URLString);
    const retrievedObjectIndex = URLParameter.get('index');
    console.log('Retrieved parameter:', retrievedObjectIndex);

// %%%%%%%%%%%%%%%%%%
    // foreach obj in jsonData
    // if obj.id == retrievedObjectIndex
    //     like in the click function - build page
// %%%%%%%%%%%%%%%%%%

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

    if (retrievedObjectIndex != null) {
        console.log('object retrieved is:', jsonData[retrievedObjectIndex].title);
        const objIndex = jsonData[retrievedObjectIndex];
        projectContentFromIndex(objIndex);
    }


    // Add a listener with on click even
    listItem.addEventListener('click', () => {
        generateProjectContent();
    });



function generateProjectContent() {
    const listSection = document.getElementById('projectMenuID');
        listSection.style.display = 'none';
        // Reveal project grid
        const projectGridContainer = document.getElementById('gridContainer');
        projectGridContainer.style.display = 'grid';

        const hero = document.getElementById('hero');
        hero.style.display = 'block';


        // POPULATE HERO
        const heroImgContainer = document.getElementById('heroImageContainer');
        const heroImage = new Image();
        heroImage.classList.add('hero-image');
        heroImage.src = obj.mainImage;
        heroImgContainer.appendChild(heroImage);

        const heroTitle = document.getElementById('heroTitle');
        heroTitle.innerHTML = obj.title;
        const heroSubtitle = document.getElementById('heroSubtitle');
        heroSubtitle.innerHTML = obj.subtitle;


        const projectType = document.getElementById('projectType');
        projectType.innerHTML = obj.projectType;

        const associate = document.getElementById('associate');
        associate.innerHTML = obj.association;
        
        const roles = document.getElementById('roles');
        roles.innerHTML = obj.roles;

        const technology = document.getElementById('technology');
        technology.innerHTML = obj.technology;
}
function projectContentFromIndex(objIndex) {
    const listSection = document.getElementById('projectMenuID');
        listSection.style.display = 'none';
        // Reveal project grid
        const projectGridContainer = document.getElementById('gridContainer');
        projectGridContainer.style.display = 'grid';

        const hero = document.getElementById('hero');
        hero.style.display = 'block';


        // POPULATE HERO
        const heroImgContainer = document.getElementById('heroImageContainer');
        const heroImage = new Image();
        heroImage.classList.add('hero-image');
        heroImage.src = objIndex.mainImage;
        heroImgContainer.appendChild(heroImage);

        const heroTitle = document.getElementById('heroTitle');
        heroTitle.innerHTML = objIndex.title;
        const heroSubtitle = document.getElementById('heroSubtitle');
        heroSubtitle.innerHTML = objIndex.subtitle;


        const projectType = document.getElementById('projectType');
        projectType.innerHTML = objIndex.projectType;

        const associate = document.getElementById('associate');
        associate.innerHTML = objIndex.association;
        
        const roles = document.getElementById('roles');
        roles.innerHTML = objIndex.roles;

        const technology = document.getElementById('technology');
        technology.innerHTML = objIndex.technology;
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



    

        // // Generate page content
        // const projectContainer = document.createElement('section');
        // projectContainer.classList.add(obj.title + '-container');

        // // Hero section
        // const hero = document.createElement('section');
        // hero.classList.add('hero');
        // projectContainer.appendChild(hero);

        // // Add row to hero
        // const row = document.createElement('section');
        // row.classList.add('row');
        // row.classList.add('container');
        // hero.appendChild(row);

        // // Add image container and image
        // // const imageContainer = document.createElement('div');
        // const image = new Image();
        // imageContainer.classList.add('hero-img-container')
        // image.src = obj.mainImage;
        // imageContainer.appendChild(image);
        // row.appendChild(imageContainer);


        // // Append the content to a desired location
        // const placementOnPage = document.body;
        // placementOnPage.appendChild(projectContainer);
    // })
// }
