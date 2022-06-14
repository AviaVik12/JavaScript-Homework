const cartItem = {
    props: ['cart_item', 'img'],

    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="img" alt="Image">
                
                <div class="product-desc">
                    <p class="product-title">
                        {{ cart_item.product_name }}
                    </p>
                    
                    <p class="product-quantity">
                        Quantity: {{ cart_item.quantity }}
                    </p>

                    <p class="product-price">
                        $ {{ cart_item.price }} each
                    </p>
                </div>
                
                <div class="right-block">
                    <p class="product-price">
                        {{ cart_item.quantity * cart_item.price }}
                    </p>
                    
                    <button 
                        class="del-btn"
                        @click="$parent.remove(cart_item)">&times;
                    >
                    </button>
                </div>
            </div>
        </div>
    `
};

const cart = {
    components: {'cart_item': cartItem},

    data() {
        return {
            cartUrl: '/getBasket.json',
            cartImage: 'https://placehold.it/50x100',
            cartShown: false,
            cartItems: []
        }
    },

    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems
                            .find(element =>
                                element.id_product === product.id_product
                            );
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign(
                                {quantity: 1}, product
                            );
                            this.cartItems.push(prod);
                        }
                    } else {
                        console.log('Some error');
                    }
                })
        },

        remove(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(
                                this.cartItems.indexOf(product),
                                1
                            );
                        }
                    }
                })
        },
    },

    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let element of data) {
                    this.cartItems.push(element);
                }
            })
    },

    template: `
        <div>
            <button
                class="btn-cart"
                type="button"
                @click="cartShown = !cartShown"
            >
                Cart
            </button>
            
            <div 
                class="cart-block"
                v-show="cartShown"    
            >
                <cart-item
                    v-for="product of cartItems"
                    :key="product.id_product"
                    :img="cartImage"
                    :cart_item="product"
                >
                </cart-item>
            </div>
        </div>
    `
};
