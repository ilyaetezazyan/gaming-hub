// تشخیص فرم بر اساس ID موجود در صفحه
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// آرایه کاربران از localStorage (در صورت خالی بودن مقداردهی اولیه)
let users = JSON.parse(localStorage.getItem('users')) || [];

// تابع ذخیره‌سازی کاربران
function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

// اگر در صفحه ورود باشیم
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('loginError');

    // جستجوی کاربر
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('currentUser', username); // ذخیره نام کاربری جاری
      window.location.href = 'index.html';
    } else {
      errorDiv.textContent = 'نام کاربری یا رمز عبور اشتباه است';
    }
  });
}

// اگر در صفحه ثبت‌نام باشیم
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    const confirm = document.getElementById('confirmPassword').value.trim();
    const errorDiv = document.getElementById('signupError');

    // اعتبارسنجی
    if (password.length < 4) {
      errorDiv.textContent = 'رمز عبور باید حداقل ۴ کاراکتر باشد';
      return;
    }
    if (password !== confirm) {
      errorDiv.textContent = 'رمز عبور و تکرار آن یکسان نیستند';
      return;
    }
    if (users.find(u => u.username === username)) {
      errorDiv.textContent = 'این نام کاربری قبلاً ثبت شده است';
      return;
    }

    // ذخیره کاربر جدید
    users.push({ username, password });
    saveUsers();

    // ورود خودکار و هدایت به صفحه اصلی
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('currentUser', username);
    window.location.href = 'index.html';
  });
}