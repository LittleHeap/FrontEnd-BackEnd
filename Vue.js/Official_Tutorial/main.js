var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/green.jpg',
        inventory: 0,
        sale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [{ variantId: 2234, variantColor: 'green', variantImage: './assets/green.jpg' }, { variantId: 2235, variantColor: 'blue', variantImage: './assets/blue.jpg' }],
        cart: 0
    },
    methods: {
        addToCart: function() {
            this.cart += 1;
        },
        deleteFromCart: function() {
            this.cart -= 1;
        },
        updateProduct: function(variantImage) {
            this.image = variantImage;
        }
    }
})