document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed'); // Debugging log
  const searchBar = document.getElementById('search-bar');
  if (searchBar) {
      console.log('Search bar found'); // Debugging log
      searchBar.addEventListener('input', function() {
          const query = this.value;
          console.log('Input event triggered, query:', query); // Debugging log
          if (query.length > 2) {
              fetchSuggestions(query);
          } else {
              document.getElementById('suggestions-container').innerHTML = '';
          }
      });
  } else {
      console.error('Search bar not found'); // Debugging log
  }
});

function fetchSuggestions(query) {
  console.log('Fetching suggestions for query:', query); // Debugging log
  // Fetch tags from Jekyll collection
  const suggestions = [
      {% for tag in site.tags %}
          '{{ tag[0] }}',
      {% endfor %}
  ];
  const filteredSuggestions = suggestions.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  console.log('Filtered suggestions:', filteredSuggestions); // Debugging log

  displaySuggestions(filteredSuggestions);
}

function displaySuggestions(suggestions) {
  console.log('Displaying suggestions:', suggestions); // Debugging log
  const suggestionsContainer = document.getElementById('suggestions-container');
  suggestionsContainer.innerHTML = '';
  suggestions.forEach(suggestion => {
      const suggestionItem = document.createElement('div');
      suggestionItem.className = 'suggestion-item';
      suggestionItem.textContent = suggestion;
      suggestionsContainer.appendChild(suggestionItem);
  });
}