<template>
  <nav class="nav">
    <Author class="index" firstName="Emin" lastName="Özmen" place="Azerbaijan" :arrow="true" link="/azerbaijan" @page="page"></Author>
    <Author class="index" firstName="Jonas" lastName="Bendiksen" place="Greenland" :arrow="true" link="/greenland" @page="page"></Author>
    <Author class="index" firstName="Susan" lastName="Meiselas" place="Honduras" :arrow="true" link="/honduras" @page="page"></Author>
    <Author class="index" firstName="Stuart" lastName="Franklin" place="Malaysia" :arrow="true" link="/borneo" @page="page"></Author>
    <Author class="index" firstName="Thomas" lastName="Dworzak" place="Tanzania" :arrow="true" link="/tanzania" @page="page"></Author>
    <Author class="index" firstName="Chien-Chi" lastName="Chang" place="Phillipines" :arrow="true" link="/philippines" @page="page"></Author>
  </nav>
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
.nav {
  background: #000;
  color: #fff;
  padding: 32px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  & > div + div {
    margin-top: 24px;
  }
  @media (min-width: 769px) {
    display: flex;
    text-align: right;
    & > div {
      flex: 1;
      transform: translateX(-25%);
      margin-top: 0 !important;
    }
  }
}
</style>
