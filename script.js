const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const COUNT = 10;
const API_KEY = `9EDCdldQhuHaW-1e2jQApJvOHfFBtTi-sD1tJ8wqC_4`;

const apiURL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`;

//helper function to set attributes to DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//display photos
function displayPhotos() {
  console.log('photos array length: ', photosArray.length);

  photosArray.forEach((photo) => {
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    console.log('photosArray: ', photosArray);
    displayPhotos();
  } catch (error) {
    //catch error here
  }
}

//on load
getPhotos();
