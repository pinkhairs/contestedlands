<template>
  <div @click="hide" :style="show ? { bottom: 0 } : { bottom: '-100%' }" class="rotate" v-if="portrait"><img src="../assets/RotateIcon.png" /> 
    <span class="caption">Best experienced widescreen.</span>
    <span class="button">+</span>
  </div>
</template>

<script>
import Cookie from 'vue-cookie';
export default {
  components: {
    Cookie
  },
  computed: {
    portrait: function() {
      if (window.matchMedia("(orientation: portrait)").matches && window.innerHeight > window.innerWidth) {
        return true
      }
    }
  },
  mounted: function() {
    if (Cookie.get('rotateIgnore') != 1) {
      this.show = true
    }
  },
  data: function() {
    return {
      show: false
    }
  },
  methods: {
    hide: function() {
      this.show = false
      Cookie.set('rotateIgnore', 1, 60*60*24*365);
    }
  }
}
</script>

<style scoped lang="scss">
.rotate {
  position: fixed;
  width: 100%;
  background: rgba(0,0,0,.9);
  z-index: 999999;
  color: #fff;
  padding: 0.25rem 0.5rem 0.5rem;
  transition: bottom 2s ease;
  img {
    vertical-align: middle;
    width: 28px;
    display: inline-block;
    margin-right: 0.5rem
  }
}
.caption {
  vertical-align: middle;
  font-size: 12px;
}
.button {
  font-size: 16px;
  transform: rotate(45deg);
  width: 20px;
  height: 20px;
  background: #fff;
  color: #000;
  font-weight: 700;
  border-radius: 300px;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
}
</style>
