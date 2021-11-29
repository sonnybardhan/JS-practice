const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let images = 0;
let totalImages = 0;
let ready = false;

const COUNT = 10;
const API_KEY = `9EDCdldQhuHaW-1e2jQApJvOHfFBtTi-sD1tJ8wqC_4`;

const apiURL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`;

//helper function to set attributes to DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//on image load
function imageLoaded() {
  images++;
  // console.log('image loaded');
  if (images === totalImages) {
    ready = true;
    console.log('ready =', ready);
    loader.hidden = true;
  }
}

//display photos
function displayPhotos() {
  images = 0;
  totalImages = photosArray.length;
  // console.log('total images =', totalImages);

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

    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //catch error here
  }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  const scrollPlusInnerHeight = this.scrollY + this.innerHeight;
  const offsetHeight = this.document.body.offsetHeight;
  if (offsetHeight - scrollPlusInnerHeight < 1000 && ready) {
    // if (offsetHeight - scrollPlusInnerHeight < 1000) {
    ready = false;
    getPhotos();
    // console.log('get photos');
  }
});

//on load
getPhotos();
