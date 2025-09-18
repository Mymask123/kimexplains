document.addEventListener('DOMContentLoaded', () => {
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
toggleBtn.addEventListener('click', () => {
document.body.classList.toggle('dark-mode');
});

// Play sound on button click
const clickSound = document.getElementById('clickSound');

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    // Reset and play
    clickSound.currentTime = 0;
    clickSound.play();
  });
});


}

const posts = [
{ title: "First Post", content: "This is my first blog post." },
{ title: "Journey", content: "Sharing my journey in engineering." }
];

const postsContainer = document.getElementById('posts');
const searchInput = document.getElementById('search');

function renderPosts(filter = "") {
if (!postsContainer) return;
postsContainer.innerHTML = "";
posts.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()))
.forEach(p => {
const div = document.createElement('div');
div.classList.add('card');
div.innerHTML = `<h3>${p.title}</h3><p>${p.content}</p>`;
postsContainer.appendChild(div);
});
}

if (searchInput) {
searchInput.addEventListener('input', (e) => {
renderPosts(e.target.value);
});
}

renderPosts();
});

// Grab the toggle

const toggle = document.getElementById("darkModeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
}

// Toggle event
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});


/*Blog Post functions*/
// Blog Post List

document.addEventListener('DOMContentLoaded', () => {

  // --- THEME TOGGLE ---
  const toggle = document.getElementById("darkModeToggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (toggle) toggle.checked = true;
  }

  if (toggle) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // --- BLOG POSTS ---
  const postsContainer = document.getElementById('posts');
  if (!postsContainer) return;

  fetch('posts.json')
    .then(response => response.json())
    .then(posts => {
      postsContainer.innerHTML = ''; // clear container
      posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${post.title}</h3>
          <div class="meta">${post.date}</div>
          <p>${post.preview || post.content.substring(0, 100)}</p>
          <a href="post.html?id=${encodeURIComponent(post.id)}" class="btn read-more">Read More →</a>
        `;
        postsContainer.appendChild(card);
      });
    })
    .catch(err => {
      postsContainer.innerHTML = '<p>Could not load posts.</p>';
      console.error(err);
    });

  // --- SEARCH ---
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const filter = e.target.value.toLowerCase();
      const cards = postsContainer.querySelectorAll('.card');
      cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(filter) ? '' : 'none';
      });
    });
  }

});

/*End of Blog Post functions*/
