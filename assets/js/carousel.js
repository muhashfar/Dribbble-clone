// assets/js/carousel.js
document.addEventListener('DOMContentLoaded', function() {
    const categoryContainer = document.querySelector('.category');
    let isDown = false;
    let startX;
    let scrollLeft;
  
    categoryContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      categoryContainer.classList.add('active');
      startX = e.pageX - categoryContainer.offsetLeft;
      scrollLeft = categoryContainer.scrollLeft;
    });
  
    categoryContainer.addEventListener('mouseleave', () => {
      isDown = false;
      categoryContainer.classList.remove('active');
    });
  
    categoryContainer.addEventListener('mouseup', () => {
      isDown = false;
      categoryContainer.classList.remove('active');
    });
  
    categoryContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - categoryContainer.offsetLeft;
      const walk = (x - startX) * 2; // Adjust the multiplier for smoother scrolling
      categoryContainer.scrollLeft = scrollLeft - walk;
    });
  
    // Touch events for mobile devices
    categoryContainer.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - categoryContainer.offsetLeft;
      scrollLeft = categoryContainer.scrollLeft;
    });
  
    categoryContainer.addEventListener('touchend', () => {
      isDown = false;
    });
  
    categoryContainer.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - categoryContainer.offsetLeft;
      const walk = (x - startX) * 2; // Adjust the multiplier for smoother scrolling
      categoryContainer.scrollLeft = scrollLeft - walk;
    });
  });