<template>
  <video autoplay muted loop :key="name" :poster="poster">
    <source :src="videoBackground" type="video/mp4">
  </video>
</template>

<script>
export default {
  props: ['video', 'name', 'backgroundType'],
  computed: {
    videoBackground: function() {
      return require('../assets/'+this.video)
    },
    poster: function() {
      return require('../assets/'+this.name+'Poster.jpg')
    }
  }
}
</script>
<style>
video, source {
  width: 100%;
  height: 100%;
  transform: scale(1.5);
}
@media (max-width: 1024px) {
  video, source {
    transform: scale(2);
  }
}
@media (max-width: 768px) {
  video, source {
    transform: scale(3.75);
  }
  video::-webkit-media-controls-start-playback-button {
    display: none !important;
  }
  video::-webkit-media-controls {
    display: none !important;
    opacity: 0;
  }
}
</style>