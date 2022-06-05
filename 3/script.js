const API =
    'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';


class List {
    constructor(url, container, list = list2) {
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }

    getJson(url) {
        return fetch(
            url
            ? url
            : `${API + this.url}`
        )
            .then(
                result => result.json()
            )
            .catch(
                error => {
                    console.log(error);
                }
            )
    }

    handleData(data) {
        this.goods = data;
        this.render();
    }

    calculateSum() {
        return this.allProducts.reduce(
            (acc, item) => acc += item.price, 0
        );
    }

    render() {
        console.log(this.constructor.name);
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new this.list
                [this.constructor.name]
                (product);
            console.log(productObject);
            this.allProducts.push(productObject);
            block.insertAdjacentElement(
                'beforeend', productObject.render()
            );
        }
    }
}


class Item {
    constructor(element, image = 'https://via.placeholder.com/200x150') {
        this.product_name = element.product_name;
        this.price = element.price;
        this.id_product = element.id_product;
        this.image = image;
    }

    render() {
        return `
            <div class="productItem" data-id="${this.id_product}">
                <img src="${this.image}" alt="Image">
                
                <div class="description">
                    <h3>
                        ${this.product_name}
                    </h3>
                    
                    <p>
                        $ ${this.price}
                    </p>
                    
                    <button 
                        class="buyButton" 
                        data-id="${this.id_product}" 
                        data-name="${this.product_name}" 
                        data-price="${this.price}">
                        Buy
                    </button>
                </div>
            </div>
        `
    }
}


class ProductsList extends List {
    constructor(
        cart,
        container = '.products',
        url = "/catalogData.json") {
            super(url, container);
            this.cart = cart;
            this.getJson()
                .then(
                    data => this.handleData(data)
                );
    }

    _init() {
        document
            .querySelector(this.container)
            .addEventListener('click', element => {
                if (element.target.classList.contains('buyButton')) {
                    this.cart.addProduct(element.target);
                }
            });
    }
}


class ProductItem extends Item {}


class Cart extends List {
    constructor(
        container = '.cartOpened',
        url = "/getBasket.json") {
            super(url, container);
            this.getJson()
                .then(
                    data => {
                        this.handleData(data.contents);
                    }
                );
    }

    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(
                data => {
                    if (data.result === 1) {
                        let productId = +element.dataset['id'];
                        let find = this.allProducts.find(
                            product => product.id_product === productId
                        );

                        if (find) {
                            find.quantity++;
                            this._updateCart(find);
                        } else {
                            let product = {
                                id_product: productId,
                                price: +element.dataset['price'],
                                product_name: element.dataset['name'],
                                quantity: 1
                            };
                            this.goods = [product];
                            this.render();
                        }
                    } else {
                        alert('Access is not allowed!');
                    }
                }
            )
    }

    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(
                data => {
                    if (data.result === 1) {
                        let productId = +element.dataset['id'];
                        let find = this.allProducts.find(
                            product => product.id_product === productId
                        );

                        if (find.quantity > 1) {
                            find.quantity--;
                            this._updateCart(find);
                        } else {
                            this.allProducts.splice(
                                this.allProducts.indexOf(find),
                                1
                            );
                            document
                                .querySelector(
                                    `.cartItem[data-id="${productId}"]`
                                )
                                .remove();
                        }
                    } else {
                        alert('Error!');
                    }
                }
            )
    }

    _updateCart(product) {
        let block = document.querySelector(
            `.cartItem[data-id="${product.id_product}"]`
        );
        block
            .querySelector('.productQuantity')
            .textContent = `Quantity: ${product.quantity}`;
        block
            .querySelector('.productPrice')
            .textContent = `$ ${product.quantity * product.price}`;
    }

    _init() {
        document
            .querySelector('.cartButton')
            .addEventListener('click', () => {
                document
                    .querySelector(this.container)
                    .classList.toggle('invisible');
            });
        document
            .querySelector(this.container)
            .addEventListener('click', element => {
                if (element.target.classList.contains('deleteButton')) {
                    this.removeProduct(element.target);
                }
            });
    }
}


class CartItem extends Item {
    constructor(element, image = 'https://via.placeholder.com/50x100') {
        super(element, image);
        this.quantity = element.quantity;
    }

    render() {
        return `
            <div class="cartItem" data-id="${this.id_product}">
                <div class="productBio">
                    <img src="${this.image}" alt="Image">
                    
                    <div class="productDescription">
                        <p class="productTitle">
                            ${this.product_name}
                        </p>
                        
                        <p class="productQuantity">
                            Quantity: ${this.quantity}
                        </p>
                        
                        <p class="productSinglePrice">
                            $${this.price}
                        </p>
                    </div>
                </div>
                
                <div class="rightBlock">
                    <p class="productPrice">
                        $${this.quantity * this.price}
                    </p>
                    
                    <button class="deleteButton" data-id="${this.id_product}">
                        x
                    </button>
                </div>
            </div>
        `;
    }
}


const list2 = {
    ProductsList: ProductItem,
    Cart: CartItem
};



