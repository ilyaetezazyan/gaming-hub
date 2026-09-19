document.getElementById('videoForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const game = document.getElementById('game').value.trim();
  const genre = document.getElementById('genre').value;
  const videoUrl = document.getElementById('videoUrl').value.trim();
  const thumbnail = document.getElementById('thumbnail').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!title || !game || !genre || !videoUrl) {
    document.getElementById('uploadStatus').textContent = 'فیلدهای ضروری را پر کن!';
    document.getElementById('uploadStatus').style.color = '#e74c3c';
    return;
  }

  let videos = JSON.parse(localStorage.getItem('gamingVideos')) || [];

  const newVideo = {
    id: Date.now().toString(),
    title,
    game,
    genre,
    videoUrl,
    thumbnail: thumbnail || '', // اگر نباشد از placeholder استفاده می‌شود
    description,
    likes: 0,
    dislikes: 0,
    views: 0,
    comments: [],
    uploadedAt: new Date().toLocaleString('fa-IR')
  };

  videos.unshift(newVideo);
  localStorage.setItem('gamingVideos', JSON.stringify(videos));

  document.getElementById('uploadStatus').textContent = '✅ ویدیو با موفقیت منتشر شد!';
  document.getElementById('uploadStatus').style.color = '#27ae60';
  document.getElementById('videoForm').reset();

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
});