let products = [
    {
        id: 1,
        name: "Camiseta Oversize Tribal",
        price: 45.00,
        available: 10,
        image: "public/productos/camisa oversize negra.png",
        description: "Camiseta negra con diseño tribal en el cuello, estilo callejero auténtico.",
        sizes: ["S", "M", "L", "XL"],
        genders: ["MASCULINO", "FEMENINO"]
    },
    {
        id: 2,
        name: "Chaqueta Varsity Lifestyle",
        price: 80.00,
        available: 8,
        image: "public/productos/saco unisex.png",
        description: "Chaqueta varsity beige con capucha blanca y estampados modernos.",
        sizes: ["S", "M", "L", "XL"],
        genders: ["MASCULINO", "FEMENINO"]
    },
    {
        id: 3,
        name: "Pantaloneta Los Angeles",
        price: 30.00,
        available: 12,
        image: "public/productos/pantaloneta.png",
        description: "Short azul deportivo con estampado 'Los Angeles'. Perfecto para el verano.",
        sizes: ["S", "M", "L"],
        genders: ["MASCULINO"]
    },
    {
        id: 4,
        name: "Gorra LA Beige y Rosa",
        price: 25.00,
        available: 15,
        image: "public/productos/gorra.png",
        description: "Gorra clásica beige con logo LA en rosa. Ajustable y urbana.",
        sizes: ["Talla Única"],
        genders: ["UNISEX"]
    },
    {
        id: 5,
        name: "Jeans Rotos Celestes",
        price: 60.00,
        available: 10,
        image: "public/productos/pantalon con rotos.png",
        description: "Jeans anchos celestes con rotos en las rodillas, ideal para looks callejeros.",
        sizes: ["28", "30", "32", "34", "36"],
        genders: ["FEMENINO"]
    },
    {
        id: 6,
        name: "Jeans Anchos Grises",
        price: 60.00,
        available: 10,
        image: "public/productos/pantalon gris.png",
        description: "Pantalón ancho gris estilo vintage. Comodidad y estilo urbano.",
        sizes: ["28", "30", "32", "34", "36"],
        genders: ["MASCULINO"]
    },
    {
        id: 7,
        name: "Chaqueta Técnica Bicolor",
        price: 90.00,
        available: 6,
        image: "public/productos/chaqueta amarrona.png",
        description: "Chaqueta impermeable marrón con diseño técnico en bloques de color.",
        sizes: ["S", "M", "L", "XL"],
        genders: ["MASCULINO", "FEMENINO"]
    },
    {
        id: 8,
        name: "Blusa Blanca Suelta",
        price: 40.00,
        available: 9,
        image: "public/productos/camisa elegante.png",
        description: "Blusa blanca de tela ligera con cuello en V y corte holgado.",
        sizes: ["S", "M", "L"],
        genders: ["FEMENINO"]
    }
];

let cartItems = [];
let selectedProduct = null;
let selectedSize = null;
let selectedGender = null;
let selectedQuantity = 1;

function showMessageModal(message) {
    document.getElementById('messageText').textContent = message;
    document.getElementById('messageModal').style.display = 'flex';
}

function hideMessageModal() {
    document.getElementById('messageModal').style.display = 'none';
}

function showCartPaymentModal() {
    renderPaymentSummary();
    document.getElementById('cartPaymentModal').style.display = 'flex';
}

function hideCartPaymentModal() {
    document.getElementById('cartPaymentModal').style.display = 'none';
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    window.scrollTo(0, 0);

    if (pageId === 'productsPage') {
        renderProducts();
    }
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer" onclick="showProductDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover" onerror="this.src='https://placehold.co/400x300/e5e7eb/374151?text=Sin+Imagen'">
            <div class="p-4">
                <h3 class="text-xl font-semibold truncate">${product.name}</h3>
                <p class="text-gray-600 my-2 text-sm line-clamp-2">${product.description}</p>
                <div class="flex justify-between items-center mt-3">
                    <span class="text-2xl font-bold text-indigo-600">$${product.price.toFixed(2)}</span>
                    <span class="text-sm ${product.available > 0 ? 'text-green-500' : 'text-red-500'}">
                        ${product.available > 0 ? `${product.available} disponibles` : 'Agotado'}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

function showProductDetail(productId) {
    selectedProduct = products.find(p => p.id === productId);

    document.getElementById('detailImage').src = selectedProduct.image;
    document.getElementById('detailImage').onerror = function() {
        this.src = 'https://placehold.co/600x600/e5e7eb/374151?text=Sin+Imagen';
    };
    document.getElementById('detailName').textContent = selectedProduct.name;
    document.getElementById('detailPrice').textContent = `$${selectedProduct.price.toFixed(2)}`;
    document.getElementById('detailAvailable').textContent = `Disponibles: ${selectedProduct.available}`;

    const sizeSelection = document.getElementById('sizeSelection');
    sizeSelection.innerHTML = selectedProduct.sizes.map(size => `
        <label class="inline-flex items-center">
            <input type="radio" name="size" value="${size}" class="form-radio h-5 w-5 text-indigo-600" onchange="selectedSize = this.value">
            <span class="ml-2 text-gray-700">${size}</span>
        </label>
    `).join('');

    const genderSelection = document.getElementById('genderSelection');
    genderSelection.innerHTML = selectedProduct.genders.map(gender => `
        <label class="inline-flex items-center">
            <input type="radio" name="gender" value="${gender}" class="form-radio h-5 w-5 text-indigo-600" onchange="selectedGender = this.value">
            <span class="ml-2 text-gray-700">${gender}</span>
        </label>
    `).join('');

    selectedSize = null;
    selectedGender = null;
    const sizeRadios = document.querySelectorAll('input[name="size"]');
    sizeRadios.forEach(radio => radio.checked = false);
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(radio => radio.checked = false);

    const quantityInput = document.getElementById('productQuantity');
    quantityInput.value = 1;
    quantityInput.max = selectedProduct.available;
    quantityInput.onchange = (event) => {
        selectedQuantity = parseInt(event.target.value);
        if (selectedQuantity > selectedProduct.available) {
            selectedQuantity = selectedProduct.available;
            quantityInput.value = selectedQuantity;
            showMessageModal(`Solo hay ${selectedProduct.available} unidades disponibles.`);
        }
        if (selectedQuantity < 1) {
            selectedQuantity = 1;
            quantityInput.value = selectedQuantity;
        }
    };

    const addToCartBtn = document.getElementById('addToCartBtn');
    if (selectedProduct.available <= 0) {
        addToCartBtn.disabled = true;
        addToCartBtn.classList.add('opacity-50', 'cursor-not-allowed');
        addToCartBtn.textContent = 'Agotado';
        quantityInput.disabled = true;
    } else {
        addToCartBtn.disabled = false;
        addToCartBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        addToCartBtn.textContent = 'Añadir al Carrito';
        quantityInput.disabled = false;
    }

    showPage('productDetailPage');
}

document.getElementById('addToCartBtn').addEventListener('click', () => {
    if (!selectedSize || !selectedGender) {
        showMessageModal('Por favor, selecciona una talla y un género.');
        return;
    }
    if (selectedProduct.available <= 0) {
        showMessageModal('Este producto está agotado.');
        return;
    }

    if (selectedQuantity < 1 || selectedQuantity > selectedProduct.available) {
        showMessageModal(`Por favor, selecciona una cantidad válida (entre 1 y ${selectedProduct.available}).`);
        return;
    }

    cartItems.push({
        ...selectedProduct,
        cartItemId: Date.now() + Math.random(),
        size: selectedSize,
        gender: selectedGender,
        quantity: selectedQuantity
    });

    selectedProduct.available -= selectedQuantity;
    document.getElementById('cartCount').textContent = cartItems.length;
    showMessageModal(`Se añadieron ${selectedQuantity} ${selectedProduct.name}(s) al carrito.`);

    setTimeout(() => {
        hideMessageModal();
        showPage('productsPage');
    }, 1500);
});

function renderPaymentSummary() {
    const cartSummaryDiv = document.getElementById('cartSummary');
    cartSummaryDiv.innerHTML = '<h4 class="text-xl font-semibold text-gray-800 mb-4">Resumen de tu Compra:</h4>';
    let total = 0;

    if (cartItems.length === 0) {
        cartSummaryDiv.innerHTML += '<p class="text-gray-600">Tu carrito está vacío.</p>';
        document.getElementById('cartPaymentModal').querySelector('.btn-primary').disabled = true;
        document.getElementById('cartPaymentModal').querySelector('.btn-primary').classList.add('opacity-50', 'cursor-not-allowed');
        return;
    } else {
        document.getElementById('cartPaymentModal').querySelector('.btn-primary').disabled = false;
        document.getElementById('cartPaymentModal').querySelector('.btn-primary').classList.remove('opacity-50', 'cursor-not-allowed');
    }

    cartItems.forEach(item => {
        total += item.price * item.quantity;
        cartSummaryDiv.innerHTML += `
            <div class="relative flex items-center justify-between p-3 mb-2 border border-gray-200 rounded-lg">
                <div class="flex flex-col items-start">
                    <span class="font-semibold text-gray-800">${item.name}</span>
                    <span class="text-sm text-gray-600">${item.size}, ${item.gender} x ${item.quantity}</span>
                    <span class="text-lg font-bold text-indigo-600">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button class="remove-item-btn" onclick="removeItemFromCart(${item.cartItemId})">
                    &times;
                </button>
            </div>
        `;
    });
    cartSummaryDiv.innerHTML += `
        <div class="flex justify-between items-center pt-4 mt-2 border-t-2 border-gray-300">
            <span class="text-lg font-bold">Total:</span>
            <span class="text-2xl font-extrabold text-indigo-600">$${total.toFixed(2)}</span>
        </div>
    `;
}

function removeItemFromCart(cartItemId) {
    const itemIndex = cartItems.findIndex(item => item.cartItemId === cartItemId);
    if (itemIndex > -1) {
        const removedItem = cartItems.splice(itemIndex, 1)[0];

        const originalProduct = products.find(p => p.id === removedItem.id);
        if (originalProduct) {
            originalProduct.available += removedItem.quantity;
        }

        document.getElementById('cartCount').textContent = cartItems.length;
        renderPaymentSummary();
        renderProducts();
        showMessageModal('Producto eliminado del carrito.');
        setTimeout(hideMessageModal, 1000);
    }
}

function confirmPayment() {
    cartItems = [];
    document.getElementById('cartCount').textContent = '0';
    showMessageModal('¡Pago confirmado! Gracias por tu compra.');
    setTimeout(() => {
        hideMessageModal();
        hideCartPaymentModal();
        showPage('productsPage');
    }, 2000);
}

window.onload = () => showPage('splashPage');

function showCustomerServiceModal() {
    document.getElementById('customerServiceModal').style.display = 'flex';
}

function hideCustomerServiceModal() {
    document.getElementById('customerServiceModal').style.display = 'none';
    document.getElementById('customerServiceForm').reset();
}

document.getElementById('customerServiceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const message = document.getElementById('customerMessage').value;
    
    // Aquí puedes agregar la lógica para enviar el mensaje a tu servidor
    console.log('Mensaje de atención al cliente:', { name, email, message });
    
    showMessageModal(`¡Gracias ${name}! Tu mensaje ha sido enviado. Te responderemos pronto a ${email}`);
    
    setTimeout(() => {
        hideMessageModal();
        hideCustomerServiceModal();
    }, 2500);
});