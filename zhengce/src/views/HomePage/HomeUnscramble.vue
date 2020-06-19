<template>
  <div class="HomeUnscramble">
    <van-cell title="政策解读" :border="false" is-link to="/unscramble" />
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide class="slide" v-for="(item,index) in banner" :key="index">
        <img :src="item.img" alt />
        <div class="label">{{item.label}}</div>
        <div class="title">{{item.header}}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
let vm = null;
export default {
  name: "HomeUnscramble",
  props: {
    banner: Array
  },
  data() {
    return {
      swiperOptions: {
        pagination: {},
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        notNextTick: true,
        //循环
        loop: false,
        //设定初始化时slide的索引
        initialSlide: 0,
        slidesPerView: "auto",
        //自动播放
        autoplay: false,
        watchSlidesProgress: true,
        spaceBetween: 10,
        slidesOffsetBefore: 20,
        centeredSlides: false,
        //滑动速度
        speed: 1000,
        paginationClickable: false,
        on: {
          click: function() {
            const realIndex = this.realIndex;
            vm.handleClickSlide(realIndex);
          }
        }
      }
    };
  },
  created() {
    vm = this;
  },
  methods: {
    handleClickSlide(e) {
      var urlsa = this._props.banner[e];
      console.log(urlsa);
      if (urlsa) {
        window.location.href = urlsa.url;
      }
    }
  }
};
</script>
<style scoped>
.slide {
  overflow: hidden;
  width: 330px;
  border-radius: 7px;
  position: relative;
}
.slide img {
  width: 100%;
  display: block;
}
.swiper-pagination {
  text-align: left;
}
.topSwiperBox {
  padding: 10px 15px;
  overflow: hidden;
}
.topSwiper {
  border-radius: 5px;
  overflow: hidden;
}
.Headlines {
  display: flex;
}
.van-cell__title {
  font-size: 18px;
}
.title {
  font-size: 18px;
  color: #fff;
  position: absolute;
  bottom: 30px;
  left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.label {
  position: absolute;
  font-size: 15px;
  color: #fff;
  left: 10px;
  bottom: 62.5px;
}
</style>
<style>
.topSwiper .swiper-pagination-bullet {
  width: 5px;
  height: 5px;
  border-radius: 2px;
}

.topSwiper .swiper-pagination-bullet-active {
  background: #fff;
  width: 8px;
}
</style>
