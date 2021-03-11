<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" :current-index="currentIndex"></detail-nav-bar>
    <scroll class="content" ref="detailScroll" :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" ></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="goodsList"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
<!--    <toast ref="toast"/>-->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from  './childComps/DetailShopInfo'
import DetailGoodsInfo from  './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from 'components/content/backTop/BackTop'
// import Toast from 'components/common/toast/Toast'
import {mapActions} from 'vuex'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
import {debounce} from 'common/utils'
export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      // Toast
    },
    data(){
      return {
        iid: null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo: {},
        goodsList:[],
        itemImageListener:null,
        themeTopYs:[],
        getThemeTopYs:null,
        currentIndex:0,
        isShow:false,
      }
    },
    created() {
      //1.保存iid
      this.iid = this.$route.query.iid
    //  2.请求相关数据
      getDetail(this.iid).then((res)=>{
        // console.log(res);
        const data = res.result
        //1.获取顶部轮播图的数据
        this.topImages = data.itemInfo.topImages
        // console.log(data);
      //  2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //  3.请求商家信息
        this.shop = new Shop(data.shopInfo)
      //  4.保存商品详情
        this.detailInfo = data.detailInfo
      //  5.请求参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //  6.获取评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }

      }).catch((err)=>{
        console.log(err);
      })
      // 请求推荐信息
      this.getRecommend()
      // console.log(this.goodsList);
      this.getThemeTopYs = debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      },100)
    },
  methods:{
    ...mapActions({
      addCart: 'addToCart'
    }),
    imageLoad(){
      this.$refs.detailScroll.refresh()
      this.getThemeTopYs()
    },
    getRecommend() {
      getRecommend().then(res => {
        this.goodsList = res.data.list
        // console.log(this.goodsList)

      })
    },
    titleClick(index){
      // console.log(index);
      this.$refs.detailScroll.scrollTo(0,-this.themeTopYs[index])

    },
    contentScroll(position){
      // console.log(position);
      let positionY = -position.y
      this.isShow = positionY >1000
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        let iPos = this.themeTopYs[i];
        /**
         * 判断的方案:
         *  方案一:
         *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
         *    优点: 不需要引入其他的内容, 通过逻辑解决
         *    缺点: 判断条件过长, 并且不容易理解
         *  方案二:
         *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
         *    优点: 简洁明了, 便于理解
         *    缺点: 需要引入一个较大的int数字
         * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
         * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
         */
        if (positionY >= iPos && positionY < this.themeTopYs[i + 1]) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
          }
          break;
        }
      }
    },
    backTop(){
      this.$refs.detailScroll.scrollTo(0,0);
    },
    addToCart() {
      // 2.将商品信息添加到Store中
      const obj = {}
      obj.iid = this.iid
      obj.imgURL = this.topImages[0]
      obj.title = this.goods.title
      obj.desc = this.goods.desc
      obj.price = this.goods.realPrice
      // this.$store.dispatch('addToCart', obj)
      this.addCart(obj).then(() => {
        // console.log(this.$toast)
        this.$toast({message: '加入购物车成功'})
      })
      // this.$store.dispatch('addToCart', obj).then(() => {
      //  this.$toast({message: '加入购物车成功'})
      // })
      // this.addCart(obj).then(() => {
      //   this.$toast({message: '加入购物车成功'})
      // })
    },

  },
  mounted(){
    const refresh = debounce(this.$refs.detailScroll.refresh,50)
    this.itemImageListener =()=>{
      refresh()
    }
    this.$bus.$on('imgLoad',this.itemImageListener)
    // this.$refs.tabControl

  },
  destroyed() {
      this.$bus.$off('imgLoad',this.itemImageListener)
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px - 49px);
  }
</style>
