const videoGrid = document.getElementById('videoGrid');
const genreList = document.getElementById('genreList');
const logoutBtn = document.getElementById('logoutBtn');

let videos = JSON.parse(localStorage.getItem('gamingVideos')) || [];

// خروج
logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('loggedIn');
  window.location.href = 'login.html';
});

// رندر کارت‌های ویدیو
function renderVideos(filter = 'all') {
  videoGrid.innerHTML = '';
  const filtered = filter === 'all' ? videos : videos.filter(v => v.genre === filter);

  if (filtered.length === 0) {
    videoGrid.innerHTML = '<p style="grid-column:1/-1; text-align:center;">هیچ ویدیویی یافت نشد.</p>';
    return;
  }

  filtered.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.onclick = () => window.location.href = `watch.html?id=${video.id}`;
    card.innerHTML = `
      <img class="thumbnail" src="${video.thumbnail || 'https://via.placeholder.com/280x150.png?text=Gaming'}" alt="thumbnail">
      <div class="card-info">
        <h4>${video.title}</h4>
        <div class="meta">${video.game || ''} • ${video.genre || ''}</div>
      </div>
    `;
    videoGrid.appendChild(card);
  });
}

// مدیریت فیلتر ژانر
genreList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    document.querySelectorAll('#genreList li').forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');
    renderVideos(e.target.dataset.genre);
  }
});

renderVideos();