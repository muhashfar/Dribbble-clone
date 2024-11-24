// assets/js/popup.js
document.addEventListener('DOMContentLoaded', function() {
    const postItems = document.querySelectorAll('.post-item');
    const popup = document.getElementById('post-popup');
    const popupContent = document.getElementById('popup-content');
    const closeButton = document.querySelector('.close-button');
  
    postItems.forEach(item => {
      item.addEventListener('click', function() {
        const postDetails = this.querySelector('.post-details').innerHTML;
        popupContent.innerHTML = postDetails;
        popup.style.display = 'block';
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
  });