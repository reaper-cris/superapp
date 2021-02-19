<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default() {
          return {};
        }
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    width: 48%;
    padding-bottom: 40px;
    position: relative;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left:0;
    right: 0;
    overflow: hidden;
    text-align: center;

  }
  .goods-info p{
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-item .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-item .collect{
    position: relative;
  }
  .goods-item .collect::before{
    content: '';
    position: absolute;
    top: -1px;
    left: -15px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  /*  background: <background-image> <background-position>/<background-size> */
  }
</style>
