<template>
  <div v-if="slides.length >= 1" @mouseover="enableKeyboard" class="slideshow" :style="slideCount == 5 || slideCount == 6 ? { width: '300%', marginLeft: '-100%' } : null">
    <swiper @touchMove="enableKeyboard" @tap="enableKeyboard" :options="swiperOption" :ref="'slideshow_' + slideshowKey">
      <swiper-slide v-for="(slide, index) in slides"><div><img :src="slide.url" :alt="slide.alt" /></div><div class="image-caption" v-html="slide.alt"></div></swiper-slide>
   </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide  } from 'vue-awesome-swiper'

export default {
 data() {
    return {
      swiperOption: {
        slideToClickedSlide: true,
        keyboard: {
          enabled: true,
          onlyIvznViewport: true
        },
        centeredSlides: true,
        spaceBetween: 32,
        slidesPerView: this.slideCount,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
  },
  props: [
    'slides',
    'index',
    'slideshowKey',
    'slideCount'
  ],
  computed: {
    slideshow: function() {
     return this.$refs['slideshow_' + this.slideshowKey].swiper
    }
  },
  mounted: function() {
    window.setTimeout(() => {
      var arrow = document.getElementById('arrow')
      arrow.style.left = 0
      arrow.style.right = 'auto'
    }, 1500)
  },
  methods: {
    enableKeyboard: function() {
      document.onkeydown = (e) => {
        switch (e.key) {
          case 'ArrowLeft':
              this.slideshow.slidePrev()
              break;
          case 'ArrowRight':
              this.slideshow.slideNext()
            // right arrow
        }
      };
    }
  }
}
</script>

<style scoped lang="scss">
  .slideshow {
    width: 200%;
    margin-left: -50%;
    max-width: none;
    margin-top: 32px;
    margin-bottom: 32px;
    color: #777;
    font-size: 16px;
    position: relative;
  }
  .swiper-slide {
    transition: opacity 300ms ease;
    opacity: .65;
    cursor: grab;
    &-active {
      opacity: 1
    }
  }
  .swiper-button-prev {
    top: 50%;
    transform: translateY(-50%) scale(2) rotate(180deg);
  }
  .image-caption {
    font-size: 14px
  }
</style>
