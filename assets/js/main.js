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