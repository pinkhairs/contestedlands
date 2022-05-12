<template>
  <div class="story" id="story" :key="slug">
    <vue-headful :title="heading"
                 :description="caption"
                 :image="promo.url"/>
    <RotateSliver />
    <div class="hero" id="hero">
      <div class="hero__line"></div>
      <div class="hero__overlay"></div>
      <div :class="slug + ' video-background'" :style="backgroundType != 'video' ? background : null">
        <Video :video="video" :name="slug" v-if="backgroundType == 'video'"></Video>
      </div>
      <div class="hero__container">
        <p><a href="/" v-on:click="goHome"><img src="../assets/logo.svg" alt="Pacific Stand Magazine"></a></p>
        <h1 class="story-heading">{{heading}}</h1>
        <h2 class="caption" v-html="caption"></h2>
        <h3><span class="story-heading">photos by</span> {{photosBy}} | <span class="story-heading">story by</span> {{textBy}}</h3>
        <p><img :src="emblem" :alt="name"></p>
      </div>
    </div>
    <div class="story__content">
      <div class="story__container">
        <div v-for="(part, index) in storyText" v-on:click="clicked()">
          <div class="story__text" v-if="part.type == 'text' && part.content" v-html="part.content"></div>
          <Slideshow :slideCount="slideCount" :key="part.key" v-if="part.type == 'slideshow'" :slides="part.slides"></Slideshow>
        </div>
      </div>
    </div>
    <Nav @page="page"></Nav>
    <Credit />
  </div>
</template>

<script>
import Vue from 'vue'

import Nav from './Nav.vue'
import Credit from './Credit.vue'
import Video from './Video.vue'
import Slideshow from './Slideshow.vue'
import RotateSliver from './RotateSliver.vue'

export default {
  components: {
    Nav,
    Video,
    Slideshow,
    Credit,
    RotateSliver
  },
  props: [
    'heading',
    'caption',
    'photosBy',
    'textBy',
    'name',
    'slug',
    'text',
    'video',
    'images',
    'backgroundType',
    'slideCount',
    'promo'
  ],
  data() {
    return {
      scrollDirection: 'up',
      active: 0,
    }
  },
  mounted: function() {
  },
  methods: {
    goHome: function(e) {
      this.$emit('page', '/');
      e.preventDefault()
    },
    findScrollDirectionOtherBrowsers: function(event){
      var delta;

      if (event.wheelDelta){
        delta = event.wheelDelta;
      } else{
        delta = -1 * event.deltaY;
      }

      if (delta < 0){
        this.scrollDirection = 'down'
      } else if (delta > 0){
        this.scrollDirection = 'up'
      }
    },
    replaceAll: function(target, search, replacement) {
      return target.replace(new RegExp(search, 'g'), replacement);
    },
    page: function(value) {
      this.$emit('page', value);
      vm.$forceUpdate();
      return value;
    },
    clicked: function() {
      // Add new
      new Vue({
        template: `<h1 style="color: red;">{{ message }}</h1>`,
        parent: this,
        data: {
          message: 'new message'
        }
      }).$mount(document.getElementById('more'))
    }
  },
  computed: {
    background: function() {
      return 'background-image: url(\''+require('../assets/'+this.slug+'.jpg')+'\'); height: 100%';
    },
    emblem: function() {
      return require('../assets/emblem-'+this.slug+'.svg');
    },
    portrait: function() {
      if (window.matchMedia("(orientation: portrait)").matches && window.innerHeight > window.innerWidth) {
        return true
      }
    },
    storyText: function() {
      var storyText = [];
      var noOfImages = this.images.length
      var img = 0;
      var end = this.slideCount;
      var n = 0;
      var slides = [];
      var increment = 0;
      var i = 0

      while (i < this.text.length + noOfImages / end) {
        var slides = [];
        increment = 0;
        if (i%2 == 0 && i > 0) {
         while (n < end && this.images[n]) {
            slides[increment++] = this.images[n]
            n++;
          }
          storyText.push({type: 'slideshow', slides: slides, key: n});
          end = end + this.slideCount;
        }

        storyText.push({type: 'text', content: this.text[i]});
        i++
      }
      return storyText;
    }
  }
}
</script>

<style scoped lang="scss">
.story {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;
  font-family: 'Chronicle Text G1', times, serif;
  line-height: 1.55;
  font-size: 20px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
  color: #000;
  &__container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    margin: 64px 0;
    @media (min-width: 769px) {
      & > div {
        flex: 1;
      }
    }
    &::-webkit-scrollbar {
        width: 0;
    }
    &::-webkit-scrollbar-track {
        background: rgba(255,255,255,0);
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0);
    }
    *::-webkit-scrollbar-thumb:hover {
        background: rgba(255,255,255,0);
    }
  }
  &__images {
    position: relative;
    @media (min-width: 769px) {
      overflow: hidden;
      img {
        display: flex;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: calc(100% - 32px);
        padding: 0 !important;
      }
      & > div {
        height: 100%;
      }
    }
    @media (min-width: 769px) {
      img {
        opacity: 0;
        transition: opacity 1s ease;
        &.is-visible {
          opacity: 1;
        }
      }
    }
    img {
      padding-top: 32px;
    }
  }
  &__text {
    padding: 12px 24px;
    width: 720px;
    margin-left: auto;
    margin-right: auto;
  }
}
.hero {
  background-color: #000;
  color: #fff;
  background-position:center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  padding: 64px 0 160px;
  text-align: center;
  position: relative;
  overflow:hidden;
  .video-background {
    position: absolute;
    top: 0;
    left: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% auto;
    width: 100%;
    height: 100%;
    &:before {
      background: -moz-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 90%, rgba(0,0,0,1) 100%);
      background: -webkit-linear-gradient(top, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 10%,rgba(0,0,0,0) 90%,rgba(0,0,0,1) 100%);
      background: linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 10%,rgba(0,0,0,0) 90%,rgba(0,0,0,1) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#000000',GradientType=0 );
      background-size: auto 100%;
    }
    @media (max-width: 1024px) {
      background-size: cover;
    }
  }
  &__container {
    width: 768px;
    margin-left: auto;
    margin-right: auto;
    z-index: 4;
    position: relative;
    > * {
     animation-name: fadeInUp;
     animation-delay: 2s;
     animation-duration: 2s;
     opacity: 0;
     animation-timing-function: ease;
     animation-fill-mode: forwards;
    }
    h2, h1 {
      padding-left: 2rem;
      padding-right: 2rem;
    }
    @media (max-width: 768px) {
      h2.caption {
        font-size: 16px;
      }
    }
  }
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    z-index: 2;
    content: ' ';
    transition: opacity 1s ease;
    opacity: 0;
    animation-name: fadeIn;
    animation-delay: 2s;
    animation-duration: 2s;
    opacity: 0;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }
  &__line {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 120px;
    background: #fff;
    z-index: 3;
    content: ' ';
    display: block;
   animation-name: fadeInUp;
   animation-delay: 2s;
   animation-duration: 2s;
   opacity: 0;
   animation-timing-function: ease;
   animation-fill-mode: forwards;
  }
}
@-webkit-keyframes fadeInUp {
  0%   { opacity: 0; transform: translateY(100%) }
  50%   { opacity: 0; transform: translateY(50%) }
  100% { opacity: 1; transform: translateY(0) }
}
@-moz-keyframes fadeInUp {
  0%   { opacity: 0; transform: translateY(100%) }
  50%   { opacity: 0; transform: translateY(50%) }
  100% { opacity: 1; transform: translateY(0) }
}
@-o-keyframes fadeInUp {
  0%   { opacity: 0; transform: translateY(100%) }
  50%   { opacity: 0; transform: translateY(50%) }
  100% { opacity: 1; transform: translateY(0) }
}
@keyframes fadeInUp {
  0%   { opacity: 0; transform: translateY(100%) }
  50%   { opacity: 0; transform: translateY(50%) }
  100% { opacity: 1; transform: translateY(0) }
}
@-webkit-keyframes fadeIn {
  0%   { opacity: 0; transform: translateY(100%) }
  100% { opacity: 1; transform: translateY(0) }
}
@-moz-keyframes fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1;  }
}
@-o-keyframes fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1;  }
}
@keyframes fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1;  }
}
</style>
