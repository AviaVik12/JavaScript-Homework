const product = {
    props: [
        'img',
        'product'
    ],

    template: `
        <div class="product-item">
            <img :src="img" alt="Image">
            
            <div class="desc">
                <h3>
                    {{ product.product_name }}
                </h3>
                
                <p>
                    {{ product.price }}
                </p>
                
                <button 
                    class="buy-btn"
                    @click="$root.$refs.cart.addProduct(product)"
                >
                    Buy
                </button>
            </div>
        </div>
    `
};

const products = {
    components: {product},

    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            catalogImage: 'https://placehold.it/200x150',
            filtered: []
        }
    },

    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let element of data) {
                    this.products.push(element);
                    this.filtered.push(element);
                }
            });

        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for (let element of data) {
                    this.products.push(element);
                    this.filtered.push(element);
                }
                console.log(this.filtered);
            })
    },

    methods: {
        filter(value) {
            let regex = new RegExp(value, 'i');
            this.filtered = this.products.filter(
                element => regex.test(
                    element.product_name
                )
            );
        }
    },

    template: `
        <div class="products">
            <product
                v-for="product of filtered"
                :key="product.id_product"
                :img="catalogImage"
                :product="product"
            >
            </product>
        </div>
    `
};
