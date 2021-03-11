<template>
  <div>
    <nav-bar>
      <div slot="left" class="left" @click="backClick" >
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center">
        <div v-for="(item,index) in titles" :key="index" @click="titleClick(index)"
             class="centerStyle" :class="{active:currentIndex === index}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    props:{
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐']
      }
    },
    methods:{
      titleClick(index){
        // this.currentIndex = index;
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back()
        // console.log(this.$router);
      }
    }
  }
</script>

<style scoped>
 .left{
  margin-top: 6px;
}
 .center{
   display: flex;
   font-size: var(--font-size);
 }
  .centerStyle{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
