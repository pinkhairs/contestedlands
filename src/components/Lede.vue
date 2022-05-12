<template>
  <div class="lede">
    <div class="spacer"></div>
    <div class="container">
      <div class="border"></div>
      <div class="solid">
        <Arrow class="solid__arrow"></Arrow>
        <h2 class="caption">Six Magnum photographers went out into remote regions around the world where indigenous communities are waging unseen battles against governments and commercial interests to remain on their ancestral lands. This is what they saw.</h2>
      </div>
      <Author class="index" firstName="Emin" lastName="Özmen" place="Azerbaijan" :arrow="false" @page="page"></Author>
      <Author class="index" firstName="Jonas" lastName="Bendiksen" place="Greenland" :arrow="false"></Author>
      <Author class="index" firstName="Susan" lastName="Meiselas" place="Honduras" :arrow="false"></Author>
      <Author class="index" firstName="Stuart" lastName="Franklin" place="Malaysia" :arrow="false"></Author>
      <Author class="index" firstName="Thomas" lastName="Dworzak" place="Tanzania" :arrow="false"></Author>
      <Author class="index" firstName="Chien-Chi" lastName="Chang" place="Philippines" :arrow="false"></Author>
    </div>
  </div>
</template>

<script>
import Arrow from './Arrow.vue'
import Author from './Author.vue'

export default {
  components: {
    Arrow,
    Author
  },
  methods: {
    page: function(value) {
      this.$emit('page', value);
      return value;
    }
  }
}
</script>

<style scoped lang="scss">
.spacer {
  height: 50vh;
}
.container {
  text-align: center;
  width: 768px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: 32px;
  padding-bottom: 100vh;
  overflow: hidden;
}
.border {
  position: absolute;
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 65%);
  top: 224px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  @media (max-width: 664px) {
    top: 264px;
  }
  @media (max-width: 500px) {
    top: 320px;
  }
  @media (max-width: 320px) {
    top: 480px;
  }
}
.solid {
  position: relative;
  z-index: 2;
  padding-bottom: 32px;
  margin-bottom: 32px;
  padding-left: 32px;
  padding-right: 32px;
  &__arrow {
    padding-top: 32px;
    position: relative;
    z-index: 2;
  }
  &:before {
    content: ' ';
    position: absolute;
    width: 1px;
    height: 48px;
    background: #fff;
    top: -48px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
}
.caption {
  position: relative;
  z-index: 2;
}
.index {
  padding: 16px;
  text-align: left;
  width: 50%;
  margin-right: auto;
  text-align: right;
  &:nth-child(2n) {
    margin-left: auto;
    margin-right: 0;
    text-align: left;
  }
}
</style>
