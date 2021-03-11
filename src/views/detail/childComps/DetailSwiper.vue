<template>
<!--  <div>-->
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in images" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
<!--  </div>-->
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      images:{
        type:Array,
        default(){
          return []
        }
      }
    },
    created() {
      // console.log(this.images);
    }
  }
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
