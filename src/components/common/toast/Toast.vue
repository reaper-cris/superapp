<template>
<!-- transition：过渡动画标签 -->
  <transition name="fade">
    <div class="toast" v-show="isShow">{{message}}</div>
  </transition>
</template>

<script>
	export default {
		name: "Toast",
    data() {
			return {
				isShow: false,
        message: '我是弹窗'
      }
    }
	}
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(0,0,0,.8);
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
    z-index: 99;
  }
  /*vue组件中使用<transition></transition>标签过渡动画*/
  /*v-enter 是进入之前，元素的起始状态*/
  /*v-leave-to 离开之后动画的终止状态*/
  /*入场(离场)动画的时间段   */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
