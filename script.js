// ===============================
// PRODUTOS
// ===============================

const products = [
    {
        name: "Camiseta VKS Logo (Preta)",
        price: 129.90,
        image: "camiseta-logo-preta.png"
    },
    {
        name: "Camiseta VKS Logo (Branca)",
        price: 129.90,
        image: "camiseta-logo-branca.png"
    },
    {
        name: "Camiseta VKS Back (Preta)",
        price: 149.90,
        image: "camiseta-back-preta.png"
    },
    {
        name: "Camiseta VKS Stone (Cinza)",
        price: 139.90,
        image: "camiseta-stone-cinza.png"
    },
    {
        name: "Boné VKS",
        price: 99.90,
        image: "bone-vks.png"
    },
    {
        name: "Touca VKS",
        price: 79.90,
        image: "touca-vks.png"
    }
];


// ===============================
// PREÇO
// ===============================

function money(value) {

    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// ===============================
// CARRINHO
// ===============================

let cart =
    JSON.parse(localStorage.getItem("vksCarrinho")) || [];


// Corrige produtos antigos sem quantidade
cart = cart.map(produto => ({
    ...produto,
    quantity: Number(produto.quantity) || 1
}));


// ===============================
// ELEMENTOS
// ===============================

const cartElement =
    document.getElementById("cart");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const backdrop =
    document.getElementById("backdrop");

const cartButton =
    document.querySelector(".cart-btn");

const closeCartButton =
    document.getElementById("closeCart");


// ===============================
// SALVAR CARRINHO
// ===============================

function saveCart() {

    localStorage.setItem(
        "vksCarrinho",
        JSON.stringify(cart)
    );

}


// ===============================
// ATUALIZAR CARRINHO
// ===============================

function updateCart() {

    // Quantidade total de peças
    const quantidadeTotal = cart.reduce(
        (total, produto) =>
            total + Number(produto.quantity || 1),
        0
    );


    // Número no ícone do carrinho
    if (cartCount) {

        cartCount.textContent =
            quantidadeTotal;

    }


    // ===============================
    // PRODUTOS DO CARRINHO
    // ===============================

    if (cartItems) {

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <p>Seu carrinho está vazio.</p>
            `;

        } else {

            cartItems.innerHTML = cart.map(
                (produto, index) => {

                    const quantidade =
                        Number(produto.quantity) || 1;

                    const subtotal =
                        Number(produto.price) *
                        quantidade;

                    return `

                    <div class="cart-row">

                        <div class="cart-product">

                            <img
                                src="${produto.image}"
                                alt="${produto.name}"
                            >

                            <div>

                                <strong>
                                    ${produto.name}
                                </strong>

                                <small>
                                    Tamanho:
                                    ${produto.size || "Único"}
                                </small>

                            </div>

                        </div>


                        <div class="cart-product-right">

                            <span>
                                ${money(subtotal)}
                            </span>


                            <div class="quantity-control">

                                <button
                                    type="button"
                                    onclick="changeQuantity(${index}, -1)"
                                    aria-label="Diminuir quantidade"
                                >
                                    −
                                </button>


                                <input
                                    type="number"
                                    min="1"
                                    value="${quantidade}"
                                    onchange="setQuantity(${index}, this.value)"
                                    onkeydown="quantityKeyDown(event, ${index})"
                                    aria-label="Quantidade"
                                >


                                <button
                                    type="button"
                                    onclick="changeQuantity(${index}, 1)"
                                    aria-label="Aumentar quantidade"
                                >
                                    +
                                </button>

                            </div>


                            <button
                                class="remove-cart"
                                type="button"
                                onclick="removeFromCart(${index})"
                                aria-label="Remover produto"
                            >
                                ×
                            </button>

                        </div>

                    </div>

                    `;

                }
            ).join("");

        }

    }


    // ===============================
    // TOTAL
    // ===============================

    if (cartTotal) {

        const total = cart.reduce(
            (sum, produto) =>
                sum +
                Number(produto.price) *
                Number(produto.quantity || 1),
            0
        );

        cartTotal.textContent =
            money(total);

    }


    // Salvar
    saveCart();

}


// ===============================
// AUMENTAR / DIMINUIR
// ===============================

function changeQuantity(index, amount) {

    if (!cart[index]) return;

    cart[index].quantity =
        Number(cart[index].quantity) || 1;

    cart[index].quantity += amount;


    // Se chegar a zero, remove
    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// ===============================
// DIGITAR QUANTIDADE
// ===============================

function setQuantity(index, value) {

    if (!cart[index]) return;

    let quantidade =
        parseInt(value, 10);


    // Valor inválido
    if (
        isNaN(quantidade) ||
        quantidade < 1
    ) {

        quantidade = 1;

    }


    cart[index].quantity =
        quantidade;

    updateCart();

}


// ===============================
// ENTER NO CAMPO
// ===============================

function quantityKeyDown(event, index) {

    if (event.key === "Enter") {

        event.preventDefault();

        setQuantity(
            index,
            event.target.value
        );

        event.target.blur();

    }

}


// ===============================
// REMOVER
// ===============================

function removeFromCart(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    updateCart();

}


// ===============================
// ABRIR CARRINHO
// ===============================

function openCart() {

    if (!cartElement) return;

    cartElement.classList.add("open");

    if (backdrop) {

        backdrop.classList.add("show");

    }

}


// ===============================
// FECHAR CARRINHO
// ===============================

function closeCart() {

    if (!cartElement) return;

    cartElement.classList.remove("open");

    if (backdrop) {

        backdrop.classList.remove("show");

    }

}


// ===============================
// BOTÃO CARRINHO
// ===============================

if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


if (closeCartButton) {

    closeCartButton.addEventListener(
        "click",
        closeCart
    );

}


if (backdrop) {

    backdrop.addEventListener(
        "click",
        closeCart
    );

}


// ===============================
// LOJA ANTIGA
// ===============================

const productsElement =
    document.getElementById("products");


if (productsElement) {

    function renderProducts(list = products) {

        productsElement.innerHTML =
            list.map(
                (produto, index) => `

                <article class="product">

                    <div class="product-img">

                        <img
                            src="${produto.image}"
                            alt="${produto.name}"
                        >

                    </div>


                    <div class="product-info">

                        <h3>
                            ${produto.name}
                        </h3>

                        <p>
                            ${money(produto.price)}
                        </p>

                    </div>


                    <button
                        class="add"
                        type="button"
                        onclick="addToCart(${index})"
                    >
                        +
                    </button>

                </article>

            `
            ).join("");

    }


    function addToCart(index) {

        const produto =
            products[index];

        if (!produto) return;


        const existente =
            cart.find(item =>
                item.name === produto.name &&
                item.size === "Único"
            );


        if (existente) {

            existente.quantity =
                Number(existente.quantity || 1) + 1;

        } else {

            cart.push({

                name: produto.name,

                price: produto.price,

                image: produto.image,

                size: "Único",

                quantity: 1

            });

        }


        updateCart();

        openCart();

    }


    renderProducts();

}


// ===============================
// ANIMAÇÕES
// ===============================

const reveals =
    document.querySelectorAll(
        ".manifesto-banner, .about, .values, .newsletter"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    reveals.forEach(section => {

        section.classList.add("reveal");

        observer.observe(section);

    });

}


// ===============================
// INICIAR
// ===============================

updateCart();