<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content">
      <home-swiper v-bind:banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control class="home-tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>





  </div>
</template>

<script>
  //导入公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  //导入组件
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeatureView from './childComps/HomeFeatureView'

  //导入对象等
  import {getHomeMultidata,getHomeGoods} from "network/home";



  export default {
    name: "home",
    components:{
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType : 'pop'
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    methods:{
      /**
       * 网络请求相关
       */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
          // console.log(this.banners);
          // console.log(this.recommends);
        }).catch(err =>{
          console.log(err);
        });
      },
      getHomeGoods(type){
        // console.log(res);
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          //报错说明：
          //返回的res的数据结构发生改变，导致res.data.list出错(已解决，措施：更改了服务器地址)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        })
      },
      /**
      *  事件监听相关
      * */
      tabClick(index){
        switch (index){
          case 0:
            this.currentType = 'pop';
            // console.log(this.banners);
            break;
          case 1:
            this.currentType = 'new';
            // console.log(this.banners);
            break;
          case 2:
            this.currentType = 'sell';
            // console.log(this.banners);
            break;
        }
      },
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    /*height: 3000px;*/
    position: relative;
    /*padding-top: 44px;*/
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    /*必须作用于开启定位的元素*/
    z-index: 9;
  }
  .home-tab-control{
    /*position:sticky;要想生效，父元素必须是固定高度值，不能出现hidden、auto、视口单位等*/
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /*height: 300px;*/
    /*overflow: hidden;*/
  }
</style>
