<template>
  <div class="credit-container">
    <div class="credit">
      <div class="pulitzer">
        <img src="../assets/credit-pulitzer.svg" alt="Pultizer Center"></a>
      </div>
      <div class="magnum">
        <p><img src="../assets/credit-magnum.svg" alt="Magnum Photos"></p>
      </div>
    </div>
    <div class="people">
      <h3><span class="caption credit-role">Producer</span> Varun Nayar</h3>
      <h3><span class="caption credit-role">Development and Design</span> Taylor Le, Diana Lopez, Elias Stein</h3>
      <h3><span class="caption credit-role">Video Editing</span> Bryan Anton</h3>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.credit-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
@media (min-width: 800px) {
  .credit-container {
    padding: 2rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-direction: row-reverse;
    width: 1440px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }
}
.credit {
  display: flex;
  width: 320px;
  position: relative;
  z-index: 1;
  height: 100px;
  @media (max-width: 800px) {
    margin: 2rem auto 0;
  }
}
.pulitzer {
  flex-basis: 120%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  text-align: right;
  border-right: 1px solid #000;
  padding-right: 32px;
  margin-right: 32px;
}
.magnum {
  flex-basis: 70%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
.pulitzer img {
  position: relative;
  top: 1px;
}
.magnum img {
  position: relative;
  top: 10px;
  width: 100%;
}
.people {
  @media (max-width: 800px) {
    text-align: center;
    padding: 32px;
  }
}
.credit-role {
  font-weight: 100;
}
h3 + h3 {
  margin-top: 0.25rem;
}
h3 {
  letter-spacing: 2px;
}
.caption {
  color: #444;
  font-weight: 100;
}
</style>
