<template>
  <div>
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a @click="sortGoods" href="javascript:;" class="price">Prices</a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur': priceChecked==='all'}" @click="turnAll">All</a></dd>
              <dd v-for="(price, index) in priceFilter" @click="setPriceFilter(index)">
                <a href="javascript:void(0)" :class="{'cur':priceChecked === index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                <img src="./../assets/img/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import axios from 'axios'

  export default {
    name: 'goods-list',
    data : function () {
      return{
        goodsList: [],
        priceFilter: [
          {
            startPrice: '00.00',
            endPrice: '100.00'
          },
          {
            startPrice: '100.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '5000.00'
          },
        ],
        priceChecked: 'all',
        filterBy: false,
        overLayFlag: false,
        //分页
        sortFlag : true,
        page : 1 ,
        pageSize : 8,
        //加载
        busy : true,
        loading: false
      }
    },
    mounted : function (){
      this.getGoodsList();
    },
    methods : {
      getGoodsList (flag) {
        let param = {
          page : this.page ,
          pageSize : this.pageSize ,
          sort : this.sortFlag?1:-1 ,
          priceLevel : this.priceChecked
        };
        this.loading = true;
        axios.get('/goods',{
          params : param
        }).then((response)=>{
          this.loading = false;
          let res = response.data;
          if(res.status === '0'){
            if(flag){
              //叠加分页
              this.goodsList = this.goodsList.concat(res.result.list);
              if (res.result.count === '0') {
                this.busy = true;
              }else {
                this.busy = false;
              }
            }else{
              this.goodsList = res.result.list;
              this.busy = false;
            }
          }else {
            this.goodsList = [];
          }
        }).catch((error)=>{
          console.log(error)
        });
      },
      sortGoods () {
        this.sortFlag =!this.sortFlag;
        this.page = 1;
        this.getGoodsList();
      },
      setPriceFilter (index) {
        this.priceChecked = index;
        this.closePop();
        this.page = 1;
        this.getGoodsList();
        console.log(this.priceChecked);
      },
      turnAll(){
        this.priceChecked = 'all';
        this.closePop();
        this.getGoodsList();
      },
      showFilterPop () {
        this.filterBy = true ;
        this.overLayFlag = true;
      },
      closePop () {
        this.filterBy = false ;
        this.overLayFlag = false;
      },
      loadMore () { //为了防止鼠标滚动过快，请求加载过于频繁
        this.busy = true ;
        setTimeout( () => {
          this.page++;
          this.getGoodsList(true);
        },500)
      }
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread
    },
  }
</script>

<style scoped>

</style>
