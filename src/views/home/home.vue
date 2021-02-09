<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper v-bind:banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <home-feature-view></home-feature-view>
    <tab-control class="home-tab-control" :titles="['流行','新款','精选']"></tab-control>

<!-- DELETE:to test -->
    <ul>
      <li>1行</li>
      <li>2行</li>
      <li>3行</li>
      <li>4行</li>
      <li>5行</li>
      <li>6行</li>
      <li>7行</li>
      <li>8行</li>
      <li>9行</li>
      <li>10行</li>
      <li>11行</li>
      <li>12行</li>
      <li>13行</li>
      <li>14行</li>
      <li>15行</li>
      <li>16行</li>
      <li>17行</li>
      <li>18行</li>
      <li>19行</li>
      <li>20行</li>
      <li>21行</li>
      <li>22行</li>
      <li>23行</li>
      <li>24行</li>
      <li>25行</li>
      <li>26行</li>
      <li>27行</li>
      <li>28行</li>
      <li>29行</li>
      <li>30行</li>
      <li>31行</li>
      <li>32行</li>
      <li>33行</li>
      <li>34行</li>
      <li>35行</li>
      <li>36行</li>
      <li>37行</li>
      <li>38行</li>
      <li>39行</li>
      <li>40行</li>
      <li>41行</li>
      <li>42行</li>
      <li>43行</li>
      <li>44行</li>
      <li>45行</li>
      <li>46行</li>
      <li>47行</li>
      <li>48行</li>
      <li>49行</li>
      <li>50行</li>
      <li>51行</li>
      <li>52行</li>
      <li>53行</li>
      <li>54行</li>
      <li>55行</li>
      <li>56行</li>
      <li>57行</li>
      <li>58行</li>
      <li>59行</li>
      <li>60行</li>
      <li>61行</li>
      <li>62行</li>
      <li>63行</li>
      <li>64行</li>
      <li>65行</li>
      <li>66行</li>
      <li>67行</li>
      <li>68行</li>
      <li>69行</li>
      <li>70行</li>
      <li>71行</li>
      <li>72行</li>
      <li>73行</li>
      <li>74行</li>
      <li>75行</li>
      <li>76行</li>
      <li>77行</li>
      <li>78行</li>
      <li>79行</li>
      <li>80行</li>
      <li>81行</li>
      <li>82行</li>
      <li>83行</li>
      <li>84行</li>
      <li>85行</li>
      <li>86行</li>
      <li>87行</li>
      <li>88行</li>
      <li>89行</li>
      <li>90行</li>
      <li>91行</li>
      <li>92行</li>
      <li>93行</li>
      <li>94行</li>
      <li>95行</li>
      <li>96行</li>
      <li>97行</li>
      <li>98行</li>
      <li>99行</li>
      <li>100行</li>
    </ul>
  </div>
</template>

<script>
  //导入公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  //导入组件
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeatureView from './childComps/HomeFeatureView'

  //导入对象等
  import {getMultiData} from "network/home";

  export default {
    name: "home",
    components:{
      NavBar,
      TabControl,
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
          'news': {page: 0, list: []},
          'sell': {page: 0, list: []}
        }
      }
    },
    created() {
      getMultiData().then(res=>{
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(this.banners);
        // console.log(this.recommends);
      }).catch(err =>{
        console.log(err);
      })
    }
  }
</script>

<style scoped>
  #home {
    /*height: 100vh;*/
    height: 3000px;
    position: relative;
    padding-top: 44px;
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
</style>
