document.getElementById('load-more').addEventListener('click', function() {
    let currentCount = document.querySelectorAll('.post-list article').length;
    fetch('/posts.json')
      .then(response => response.json())
      .then(data => {
        let posts = data.slice(currentCount, currentCount + 10);
        let postList = document.querySelector('.post-list');
        posts.forEach(post => {
          let article = document.createElement('article');
          article.innerHTML = `
            <h2><a href="${post.url}">${post.title}</a></h2>
            <p>${post.excerpt}</p>
            <img data-src="${post.image}" class="lazyload" alt="${post.title}">
          `;
          postList.appendChild(article);
        });
        if (currentCount + 10 >= data.length) {
          document.getElementById('load-more').style.display = 'none';
        }
      });
  });

  document.getElementById('search-bar').addEventListener('input', function() {
    const query = this.value;
    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      document.getElementById('suggestions-container').innerHTML = '';
    }
  });
  
  function fetchSuggestions(query) {
    // Mock data for demonstration purposes
    const suggestions = ['Design', 'Development', 'UI', 'UX', 'Graphics'];
    const filteredSuggestions = suggestions.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  
    displaySuggestions(filteredSuggestions);
  }
  
  function displaySuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
      const suggestionItem = document.createElement('div');
      suggestionItem.className = 'suggestion-item';
      suggestionItem.textContent = suggestion;
      suggestionsContainer.appendChild(suggestionItem);
    });
  }