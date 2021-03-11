<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabControl0" v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="HomeScroll" @pullingUp="loadMore"
            @scroll="controlScrollShow"
            :probe-type="3" :pull-up-load="true">
      <home-swiper v-bind:banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"></back-top>




  </div>
</template>

<script>
  //导入公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  //导入组件
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeatureView from './childComps/HomeFeatureView'

  //导入对象等
  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "common/utils";


  export default {
    name: "home",
    components:{
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
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
        currentType : 'pop',
        isShow:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        itemImageListener:null
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
    mounted(){
      const refresh = debounce(this.$refs.HomeScroll.refresh,50)
      this.itemImageListener =()=>{
        refresh()
      }
      this.$bus.$on('imgLoad',this.itemImageListener)
      // this.$refs.tabControl
    },
    activated(){
      // alert('000')
      this.$refs.HomeScroll.scrollTo(0,this.saveY,0)
      this.$refs.HomeScroll.refresh()
    },
    deactivated(){
      this.saveY = this.$refs.HomeScroll.getScrollY()
      // console.log(this.saveY);
      this.$bus.$off('imgLoad',this.itemImageListener)
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
          // console.log(res);
          //报错说明：
          //返回的res的数据结构发生改变，导致res.data.list出错(已解决，措施：更改了服务器地址)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        });
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
        this.$refs.tabControl0.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
      },
      backTop(){
        this.$refs.HomeScroll.scrollTo(0,0);
      },
      controlScrollShow(position){
        // console.log(position);
        //判断BackTop是否显示
        this.isShow = (-position.y) >1000
      //  决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = (-position.y)>this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
        this.$refs.HomeScroll.finishPullingUp()
      },
      swiperImageLoad(){
        //.$el 获取Vue实例关联的DOM元素；
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        // console.log(this.tabOffsetTop);
      }
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

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*必须作用于开启定位的元素*/
    /*z-index: 9;*/
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /*.home-tab-control{*/
  /*  !*position:sticky;要想生效，父元素必须是固定高度值，不能出现hidden、auto、视口单位等*!*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/
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
