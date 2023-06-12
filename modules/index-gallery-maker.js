export function populateGalleryContainer(jsonData, galleryGrid) {
    const galleryItemPromises = jsonData.map(obj => createGalleryItem(obj, galleryGrid));
    return Promise.all(galleryItemPromises);
}
  
  async function  createGalleryItem(obj, galleryGrid) {
    return new Promise((resolve, reject) => {
      console.log('Populating gallery...');
      
      // Make variable containers for items of gallery cards
      const galleryItemContainer = document.createElement('div');
      const galleryItemContainerOverlay = document.createElement('div');
      const titleContainer = document.createElement('a');
      const title = document.createElement('h2');
      const imageSource = obj.mainImage;
      const image = new Image();

      image.onload = () => {
        console.log('image:', obj.id);
      };

      // create the content, text, image source
      title.innerHTML = obj.title;
      image.src = imageSource;
      image.style.width = '100%';

      // const indexKey = obj.id;
      // console.log('Object index:', indexKey);


      image.setAttribute('class', 'gallery-item_image');
      title.setAttribute('class', 'gallery-item_title gallery-nav-links');
      titleContainer.setAttribute('class', 'gallery-item__title-container');
            



      galleryItemContainer.setAttribute('class', 'gallery-item');
      galleryItemContainer.setAttribute('id', 'galleryItem_' + obj.id);

      galleryItemContainerOverlay.setAttribute('class', 'gallery-item__overlay');

      titleContainer.appendChild(title);
      galleryItemContainer.appendChild(image);
      galleryItemContainer.appendChild(titleContainer);
      galleryGrid.appendChild(galleryItemContainer);

      galleryItemContainer.appendChild(galleryItemContainerOverlay);

      indexOnClick(obj, galleryItemContainer, titleContainer);
      // Resolve the promise to indicate that the function is complete
      // resolve(galleryGrid);
    });
  }

  function indexOnClick(thisObject, galleryItemContainer, titleContainer) {
    galleryItemContainer.addEventListener('click', () => {
      // Retrieve the selected object's ID value
      const indexID = thisObject.id;
      console.log('Object index:', indexID);

      // Pass the ID value as a query parameter in the URL.
      // const anchorElement = document.getElementById('galleryItem_' + thisObject.id);
      titleContainer.href = `projects.html?index=${indexID}`; // Query parameter, back ticks! ?index=${objectIndex}


      // As a test - Update the current URL
      const newURL = new URL(window.location.href);
      // Set the Parameter of the above URL
      newURL.searchParams.set('index', indexID);
      history.replaceState(null, '', newURL.toString());

      // Retrieving that parameter, create new variable for handling the URL
      const URLString = window.location.search;
      // Call the URL parameter search method
      const URLParameter = new URLSearchParams(URLString);
      const retrievedObjectIndex = URLParameter.get('index');
      console.log('Retrieved parameter:', retrievedObjectIndex);
  

    });
  }

  // export function indexOnClick(galleryItem) {
  //   return new Promise((resolve, reject) => {
  //     galleryItem.addEventListener('click', () => {
  //       const objectIndex = obj.id;

  //       resolve(objectIndex, indexKey);
  //     });
  //   });
  // }