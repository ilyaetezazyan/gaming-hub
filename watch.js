const params = new URLSearchParams(window.location.search);
const videoId = params.get('id');

let videos = JSON.parse(localStorage.getItem('gamingVideos')) || [];
let video = videos.find(v => v.id === videoId);

if (!video) {
  alert('ویدیو یافت نشد');
  window.location.href = 'index.html';
}

// اطمینان از وجود آبجکت votes
if (!video.votes) video.votes = {};

// نام کاربری فعلی (ذخیره شده در sessionStorage هنگام ورود/ثبت‌نام)
const currentUser = sessionStorage.getItem('currentUser') || 'anonymous';

// افزایش بازدید (بدون تغییر)
video.views = (video.views || 0) + 1;
localStorage.setItem('gamingVideos', JSON.stringify(videos));

// ----- نمایش اطلاعات ویدیو -----
document.getElementById('videoPlayer').src = video.videoUrl;
document.getElementById('videoTitle').textContent = video.title;
document.getElementById('videoTitleHeader').textContent = video.title;
document.getElementById('gameName').textContent = video.game || 'بدون نام';
document.getElementById('viewsCount').textContent = video.views || 0;
document.getElementById('videoDesc').textContent = video.description || '';

// ----- بروزرسانی اولیه تعداد و دکمه‌ها -----
document.getElementById('likes').textContent = video.likes || 0;
document.getElementById('dislikes').textContent = video.dislikes || 0;
updateButtonStates();

// ----- مدیریت رأی (Like/Dislike) -----
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');

likeBtn.addEventListener('click', () => {
  vote('like');
});

dislikeBtn.addEventListener('click', () => {
  vote('dislike');
});

function vote(type) {
  const currentVote = video.votes[currentUser];  // می‌تونه undefined, 'like' یا 'dislike' باشه

  if (currentVote === type) {
    // اگر همان دکمه‌ای که قبلاً زده دوباره کلیک بشه → برداشتن رأی
    delete video.votes[currentUser];
    video[type + 's']--;  // likes-- یا dislikes--
  } else {
    // اگر رأی قبلی وجود داشت و مخالف بود، اون رو بردار
    if (currentVote) {
      video[currentVote + 's']--;
    }
    // رأی جدید رو ثبت کن
    video.votes[currentUser] = type;
    video[type + 's']++;
  }

  // ذخیره‌سازی در localStorage
  localStorage.setItem('gamingVideos', JSON.stringify(videos));

  // بروزرسانی UI
  document.getElementById('likes').textContent = video.likes || 0;
  document.getElementById('dislikes').textContent = video.dislikes || 0;
  updateButtonStates();
}

function updateButtonStates() {
  const currentVote = video.votes[currentUser];
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');

  // حذف کلاس‌های فعال قبلی
  likeBtn.classList.remove('active');
  dislikeBtn.classList.remove('active');

  if (currentVote === 'like') {
    likeBtn.classList.add('active');
  } else if (currentVote === 'dislike') {
    dislikeBtn.classList.add('active');
  }
}

// ----- بخش نظرات (بدون تغییر) -----
const commentsList = document.getElementById('commentsList');
const commentInput = document.getElementById('commentInput');
const submitComment = document.getElementById('submitComment');

function renderComments() {
  commentsList.innerHTML = '';
  if (video.comments && video.comments.length > 0) {
    video.comments.forEach(c => {
      const div = document.createElement('div');
      div.className = 'comment';
      div.textContent = c;
      commentsList.appendChild(div);
    });
  } else {
    commentsList.innerHTML = '<p style="color:#aaa;">اولین نظر رو تو بذار!</p>';
  }
}

submitComment.addEventListener('click', () => {
  const text = commentInput.value.trim();
  if (!text) return;
  if (!video.comments) video.comments = [];
  video.comments.push(text);
  localStorage.setItem('gamingVideos', JSON.stringify(videos));
  commentInput.value = '';
  renderComments();
});

renderComments();