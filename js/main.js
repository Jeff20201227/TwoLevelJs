const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',

    searchLine: "",

    cart: [],
    isVisibleCart: false,
    imgCart: 'https://placehold.it/50x100',
  },
  methods: {
    getJson(url){       //получаем данные о товаре из API
      return fetch(url)
          .then(result => result.json())
          .catch(error => {
            console.log(error);
          })
    },
    addProduct(product) {     //Добавляем продукт в корзину, в случае если товара нет(проверка по id) добавляем строчки о продукте, имени продукта, цене за продукт, плюс его количество: 1.
                              //В случае если такой товар уже есть добавляем +1 товар.
      const indexOfCart = this._getIndexOfCart(product);
      if ( indexOfCart === -1){
          this.cart.push({id: product.id_product, name: product.product_name, price: product.price, quantity: 1});
      }else{
          this.cart[indexOfCart].quantity++;
      }
    },

    _getIndexOfCart(product){  //метод проверяет какой товар добавляем в корзину.
      for (let i = 0; i < this.cart.length; i++){
        if (this.cart[i].id === product.id_product){
          return i;
        }
      }
      return -1;
    },

    getTotalPrice(){   //метод для подсчёта итоговой цены (цена * количество)
      let totalPrice = 0;
      for (let product of this.cart){
        totalPrice += product.price * product.quantity;
      }
      return totalPrice;
    },

    removeProductOfCart(product){  //метод для удаления товара из корзины
      this.cart.splice(this.cart.indexOf(product), 1);
    },

    filterGoods(product){ //метод показывающий какой товар надо показать после поиска
      return (new RegExp(this.searchLine, "i")).test(product.product_name);
    }
  },
  beforeCreate() {

  },
  created() {
      this.getJson(`${API + this.catalogUrl}`)
          .then(data => {
            for(let el of data){
              this.products.push(el);
            }
          });
  },
  beforeMount() {

  },
  mounted(){

  },
  beforeUpdate() {

  },
  updated() {

  },
  beforeDestroy() {

  },
  destroyed() {

  },
});

