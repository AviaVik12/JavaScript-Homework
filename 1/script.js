let goods = [
    { title: 'Shirt', price: 150, image: 'images/shirt.jpg'},
    { title: 'Socks', price: 50, image: 'images/socks.webp'},
    { title: 'Jacket', price: 350, image: 'images/jacket.jpeg'},
    { title: 'Shoes', price: 250, image: 'images/shoes.jpg'},
];

const renderGoodsItem = (item) => {
    return `
        <div class="goods-item">
            <div class="product">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <img src="${item.image}" alt="">
                <button class="cart-button" type="button">Корзина</button>
            </div>
        </div>
    `;
};

const renderGoodsList = list => {
    document.querySelector('.goods-list').innerHTML = (
        list.map(item => renderGoodsItem(item))
    ).join('');
}

renderGoodsList(goods);


