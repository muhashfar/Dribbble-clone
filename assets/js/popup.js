// assets/js/popup.js
document.addEventListener('DOMContentLoaded', function() {
  const postItems = document.querySelectorAll('.post-item');
  const categoryItems = document.querySelectorAll('.category-item');
  const popup = document.getElementById('post-popup');
  const popupContent = document.getElementById('popup-content');
  const closeButton = document.querySelector('.close-button');
  const fullscreenImage = document.getElementById('fullscreen-image');
  const fullscreenImg = document.getElementById('fullscreen-img');
  const fullscreenCloseButton = fullscreenImage.querySelector('.close-button');
  const searchResults = document.getElementById('search-results');
  const searchInput = document.getElementById('search-input');

  // Function to filter posts by category
  function filterPosts(category) {
    postItems.forEach(item => {
      if (category === 'all' || item.getAttribute('data-category').includes(category)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Function to set active category
  function setActiveCategory(activeCategory) {
    categoryItems.forEach(item => {
      if (item.getAttribute('data-category') === activeCategory) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Event listeners for category items
  categoryItems.forEach(item => {
    item.addEventListener('click', function(event) {
      event.preventDefault();
      const category = this.getAttribute('data-category');
      filterPosts(category);
      setActiveCategory(category);
    });
  });

  // Initialize by showing all posts
  filterPosts('all');

  // Function to show popup with post details
  function showPopup(postDetails) {
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
  }

  postItems.forEach(item => {
    item.addEventListener('click', function() {
      const postDetails = this.querySelector('.post-details').innerHTML;
      showPopup(postDetails);
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

  // Function to handle search results
  function handleSearchResults(results) {
    searchResults.innerHTML = '';
    if (results.length > 0) {
      searchResults.style.display = 'grid';
      results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result');
        resultItem.innerHTML = `
          <div class="post-item" style="display: block;">
            <div style="background: url('${result.image}'); border-radius: 10px; height: 240px; width: 100%; background-repeat: no-repeat; background-position: center; background-size: cover;">
            </div>
            <div style="display: inline-flex; margin-top: 8px; width: 100%;">
              <span style="margin-left: 10px; margin-top: 0.24rem; font-size: 14px; font-weight: 500;">${result.title}</span>
            </div>
        `;
        resultItem.addEventListener('click', function() {
          const postDetails = `
            <h2>${result.title}</h2>
            <img src="${result.image}" alt="${result.title}">
            <p>${result.desc}</p>
            <div class="carousel">
              <div class="carousel-inner">
                ${result.gallery.map(image => `
                  <div class="carousel-item">
                    <img src="${image}" alt="${result.title}" class="carousel-image">
                  </div>
                `).join('')}
              </div>
              <button class="carousel-control prev"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button>
              <button class="carousel-control next"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>
            </div>
            ${result.file ? `<a href="${result.file}" class="download-button" download>Download Asset</a>` : ''}
          `;
          showPopup(postDetails);
        });
        searchResults.appendChild(resultItem);
      });
    } else {
      searchResults.style.display = 'none';
    }
  }

  // Function to perform search
  function search(query) {
    fetch('/search.json')
      .then(response => response.json())
      .then(data => {
        const results = data.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
        handleSearchResults(results);
      });
  }

  // Event listener for search input
  searchInput.addEventListener('input', function() {
    const query = this.value;
    if (query.trim() === '') {
      searchResults.style.display = 'none';
    } else {
      search(query);
    }
  });
});