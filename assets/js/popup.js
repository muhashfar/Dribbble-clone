// assets/js/popup.js
document.addEventListener('DOMContentLoaded', function() {
    const postItems = document.querySelectorAll('.post-item');
    const popup = document.getElementById('post-popup');
    const popupContent = document.getElementById('popup-content');
    const closeButton = document.querySelector('.close-button');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenImg = document.getElementById('fullscreen-img');
    const fullscreenCloseButton = fullscreenImage.querySelector('.close-button');
  
    postItems.forEach(item => {
      item.addEventListener('click', function() {
        const postDetails = this.querySelector('.post-details').innerHTML;
        popupContent.innerHTML = postDetails;
        popup.style.display = 'block';
  
        // Initialize carousel
        const carousel = popupContent.querySelector('.carousel');
        const carouselInner = carousel.querySelector('.carousel-inner');
        const prevButton = carousel.querySelector('.carousel-control.prev');
        const nextButton = carousel.querySelector('.carousel-control.next');
        const carouselImages = carousel.querySelectorAll('.carousel-image');
        let currentIndex = 0;
  
        function updateCarousel() {
          const width = carousel.clientWidth;
          carouselInner.style.transform = `translateX(-${currentIndex * width}px)`;
        }
  
        prevButton.addEventListener('click', function() {
          currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselInner.children.length - 1;
          updateCarousel();
        });
  
        nextButton.addEventListener('click', function() {
          currentIndex = (currentIndex < carouselInner.children.length - 1) ? currentIndex + 1 : 0;
          updateCarousel();
        });
  
        window.addEventListener('resize', updateCarousel);
        updateCarousel();
  
        // Add event listeners for fullscreen functionality
        carouselImages.forEach(image => {
          image.addEventListener('click', function() {
            fullscreenImg.src = this.src;
            fullscreenImage.style.display = 'flex';
          });
        });
      });
    });
  
    closeButton.addEventListener('click', function() {
      popup.style.display = 'none';
    });
  
    window.addEventListener('click', function(event) {
      if (event.target === popup) {
        popup.style.display = 'none';
      }
    });
  
    fullscreenCloseButton.addEventListener('click', function() {
      fullscreenImage.style.display = 'none';
    });
  
    fullscreenImage.addEventListener('click', function(event) {
      if (event.target === fullscreenImage) {
        fullscreenImage.style.display = 'none';
      }
    });
  });