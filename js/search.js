/*Vue.component('search', {
    data(){
        return {
            searchLine: '',
        };
    },
    methods: {
        filterGoods(product){ //метод показывающий какой товар надо показать после поиска
            return (new RegExp(this.searchLine, "i")).test(product.product_name);
          }
    },
    template: `
    <div class="search-form" @submit.prevent="$parent.products.filter(searchLine)">
    <input type="text" class="search-field" v-model="searchLine">
    <button class="btn-search" type="submit">
        <i class="fas fa-search"></i>
    </button>
</div>
    `
}); */