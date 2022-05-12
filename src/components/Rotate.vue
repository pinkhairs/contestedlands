<template>
  <div class="rotate" v-if="portrait">
  </div>
</template>

<script>
export default {
  computed: {
    portrait: function() {
      if (window.matchMedia("(orientation: portrait)").matches && window.innerHeight > window.innerWidth) {
        return true
      }
    }
  },
}
</script>

<style scoped lang="scss">
.rotate {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.75) url(../assets/Rotate.png) center no-repeat;
  background-size: 75%;
  z-index: 999999
}
</style>
