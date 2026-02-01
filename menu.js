// Khởi tạo giỏ hàng từ localStorage hoặc mảng rỗng
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hàm hiển thị giỏ hàng
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    if (!cartItems) return;

    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<tr><td colspan="5" class="text-center">Giỏ hàng trống</td></tr>';
    } else {
        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            cartItems.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price.toLocaleString()}đ</td>
                    <td>
                        <input type="number" value="${item.quantity}" min="1" class="form-control form-control-sm" style="width: 60px" 
                               onchange="updateQuantity(${index}, this.value)">
                    </td>
                    <td>${subtotal.toLocaleString()}đ</td>
                    <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Xóa</button></td>
                </tr>
            `;
        });
    }
    totalPrice.innerText = total.toLocaleString() + 'đ';
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Thêm sản phẩm (Dùng nút bấm ở phần sản phẩm để gọi hàm này)
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    alert(`Đã thêm ${name} vào giỏ!`);
    renderCart();
}

function updateQuantity(index, qty) {
    cart[index].quantity = parseInt(qty);
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function checkout() {
    if (cart.length === 0) return alert("Chưa có gì để thanh toán!");
    alert("Cảm ơn bạn đã mua hàng tại S-Zone🏀!");
    cart = [];
    renderCart();
    bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
}

// Chạy lần đầu khi load trang
document.addEventListener('DOMContentLoaded', renderCart);