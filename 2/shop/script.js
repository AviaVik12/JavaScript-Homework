class GoodsList {
    constructor(container = '.goods-list') {
        this.container = container;
        this.goods = [];
        this.allGoods = [];
        this._fetchGoods();
    }

    _fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150, image: 'images/shirt.jpg'},
            { title: 'Socks', price: 50, image: 'images/socks.webp'},
            { title: 'Jacket', price: 350, image: 'images/jacket.jpeg'},
            { title: 'Shoes', price: 250, image: 'images/shoes.jpg'},
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let good of this.goods) {
            const goodObj = new GoodItem(good);
            this.allGoods.push(goodObj);
            block.insertAdjacentHTML('beforeend', goodObj.render());
        }
    }

    getSum() {
        let i = 0;
        this.goods.forEach(item => {
            i += item.price;
        })
    }
}

class GoodItem {
    constructor(good) {
        this.title = good.title;
        this.price = good.price;
        this.id = good.id;
        this.image = good.image;
    }

    render() {
        return `
            <div class="good-item" data-id="${this.id}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <img src="${this.image}" alt="Image">
                <button class="cart-button">Buy</button>
            </div>
        `;
    }
}

let list = new GoodsList();
list.render();
list.getSum();

// Basket template

class Basket {
    addItem () {}
    removeItem () {}
    show () {}
}

class BasketItem {
    showItem () {}
}
