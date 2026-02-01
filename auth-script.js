// 1. Chuyển đổi giữa 2 Form
function toggleForm() {
    const login = document.getElementById('loginForm');
    const register = document.getElementById('registerForm');
    if (login.style.display === 'none') {
        login.style.display = 'block';
        register.style.display = 'none';
    } else {
        login.style.display = 'none';
        register.style.display = 'block';
    }
}

// 2. Hàm hiển thị lỗi
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.innerText = message;
        errorElement.style.display = 'block';
        setTimeout(() => { errorElement.style.display = 'none'; }, 3000);
    }
}

// 3. XỬ LÝ ĐĂNG KÝ
const regForm = document.getElementById('register-form-element');
if (regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;

        // Kiểm tra email tồn tại chưa
        if (localStorage.getItem(email)) {
            showError('reg-error', 'Email này đã được sử dụng!');
            return;
        }

        // LƯU MẬT KHẨU VÀ TÊN (Lưu object vào LocalStorage)
        const userData = {
            fullName: name,
            password: pass
        };
        localStorage.setItem(email, JSON.stringify(userData));

        alert("Đăng ký thành công! Hãy đăng nhập để bắt đầu.");
        toggleForm(); // Chuyển về trang đăng nhập
    });
}

// 4. XỬ LÝ ĐĂNG NHẬP
const loginForm = document.getElementById('login-form-element');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;

        // Lấy dữ liệu người dùng từ bộ nhớ
        const storedUser = localStorage.getItem(email);

        if (!storedUser) {
            showError('login-error', 'Tài khoản không tồn tại!');
        } else {
            const userData = JSON.parse(storedUser);

            // KIỂM TRA MẬT KHẨU
            if (userData.password === pass) {
                // Lưu trạng thái đăng nhập
                localStorage.setItem('currentUser', userData.fullName);
                
                alert("Chào mừng " + userData.fullName + " đã quay trở lại!");
                
                // CHUYỂN TRANG: Tới trang chủ
                window.location.href = 'menu.html'; 
            } else {
                showError('login-error', 'Mật khẩu sai. Vui lòng thử lại!');
            }
        }
    });
}

// 5. Hàm Đăng xuất (Dùng cho nút thoát ở trang chủ)
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';} // Quay lại trang login