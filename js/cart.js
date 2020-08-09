Vue.component('cart', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            cart: [],
            isVisibleCart: false,
            imgCart: 'https://placehold.it/50x100',
        }
    },
    methods: {
        addProduct(product) { //Добавляем продукт в корзину, в случае если товара нет(проверка по id) добавляем строчки о продукте, имени продукта, цене за продукт, плюс его количество: 1.
            //В случае если такой товар уже есть добавляем +1 товар.
            const indexOfCart = this._getIndexOfCart(product);
            if (indexOfCart === -1) {
                this.cart.push({
                    id: product.id_product,
                    name: product.product_name,
                    price: product.price,
                    quantity: 1
                });
            } else {
                this.cart[indexOfCart].quantity++;
            }
        },

        _getIndexOfCart(product) { //метод проверяет какой товар добавляем в корзину.
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === product.id_product) {
                    return i;
                }
            }
            return -1;
        },

        getTotalPrice() { //метод для подсчёта итоговой цены (цена * количество)
            let totalPrice = 0;
            for (let product of this.cart) {
                totalPrice += product.price * product.quantity;
            }
            return totalPrice;
        },

        removeProductOfCart(product) { //метод для удаления товара из корзины
            this.cart.splice(this.cart.indexOf(product), 1);
        },

        filterGoods(product) { //метод показывающий какой товар надо показать после поиска
            return (new RegExp(this.searchLine, "i")).test(product.product_name);
        }
    },
    beforeCreate() {

    },
    created() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },
    template: `
    <button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart">Корзина</button>
    <div class="cart-block" :class="{invisible: !isVisibleCart}">
        <h3 v-if="cart.length === 0">Корзина пока пуста</h3>
        <div class="cart-item" v-for="product of cart" :key="'cart-'+product.id">
            <div class="product-bio">
                <img :src="imgCart" alt="Some img">
                <div class="product-desc">
                    <p class="product-title">{{ product.name }}</p>
                    <p class="product-quantity">Количество:<br>
                        <button v-if="product.quantity > 1" @click="product.quantity--">-</button>
                        <button v-else @click="removeProductOfCart(product)">-</button>
                        {{ product.quantity }}
                        <button @click="product.quantity++">+</button>

                    </p>
                    <p class="product-single-price">{{ product.price }} за ед.</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">{{ product.price * product.quantity }} руб.</p>
                <button class="del-btn" @click="removeProductOfCart(product)">X</button>
            </div>
        </div>
        <h4 v-if="cart.length > 0">Итого: {{ getTotalPrice() }} руб.</h4>
    </div>
</div>`
});
