<template>
  <div class="author">
    <div v-on:click="clickStory" :class="link ? 'link' : null" class="story-author-block">
      <Arrow v-if="arrow"></Arrow>
      <h2>{{firstName}}<br />{{lastName}}</h2>
      <h3 class="caption accent">{{place}}</h3>
    </div>
  </div>
</template>

<script>
import Arrow from './Arrow.vue'

export default {
  components: {
    Arrow
  },
  props: {
    link: String,
    arrow: Boolean,
    firstName: String,
    lastName: String,
    place: String
  },
  methods: {
    clickStory: function() {
      if (this.link) {
        this.$emit('page', this.link);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.story-author-block {
  text-decoration: none;
  p + h2 {
    margin-top: 0;
  }
  h2 + h3 {
    margin-top: 0;
  }
  h2 {
    color: #fff;
  }
}
.link {
  cursor: pointer;
}
</style>
