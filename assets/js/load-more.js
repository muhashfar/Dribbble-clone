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