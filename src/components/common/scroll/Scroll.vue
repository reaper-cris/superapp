<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data(){
      return {
        scroll:null
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    mounted() {
      //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType: this.probeType,
        pullUpLoad:this.pullUpLoad
      })
      //监听滚动
      this.scroll.on('scroll',(position) =>{
        // console.log(position);
        this.$emit('scroll',position)
      })
    //  监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
          // console.log('swwww');
        })
      }
      // this.scroll.on('pullingUp',()=>{
      //   this.$emit('pullingUp')
      // })

    },
    methods:{
      scrollTo(x,y,time=500){
        //es6的设置默认参数的语法
        this.scroll.scrollTo(x,y,time)
      },
      refresh(){
        this.scroll && this.scroll.refresh && this.scroll.refresh()
        // console.log('------');
      },
      finishPullingUp(){
        this.scroll.finishPullUp()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y:0
      }

    }
  }
</script>

<style scoped>

</style>
