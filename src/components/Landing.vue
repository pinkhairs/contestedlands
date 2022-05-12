<template>
  <div class="landing" id="landing" key="landing">
    <div class="container" id="container">
      <div class="bg1" id="background">
        <h2 class="caption photographer" v-text="photographer"></h2>
      </div>
      <div class="credit toFadeOut">
        <div class="pulitzer">
          <h3 class="accent caption">This project was<br>made possible thanks<br>to support from</h3>
          <img srcset="../assets/pulitzer-1x.png 1x, ../assets/pulitzer.png 2x" alt="Pultizer Center"></a>
        </div>
        <div class="magnum">
          <p><img srcset="../assets/magnum-1x.png 1x, ../assets/magnum.png 2x" alt="Magnum Photos"></p>
        </div>
      </div>
      <div class="content toFadeOut">
        <p><a href="https://psmag.com" target="_blank"><img src="../assets/logo.svg" alt="Pacific Stand Magazine"></a></p>
        <h1>A Journey<br>Through<br><span class="accent">Contested<br>Lands</span></h1>
      </div>
      <!-- Begin MailChimp Signup Form -->
      <form action="https://psmag.us4.list-manage.com/subscribe/post?u=2a3f99f9e81d48228ea39f9a4&amp;id=f8690ec925" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate  subscribe toFadeOut" v-if="!live" target="_blank">
        <Arrow></Arrow>
        <label for="mce-EMAIL"><h2 class="caption">Email me when this story launches</h2></label>
        <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
      </form>
      <!--End mc_embed_signup-->
      <!--End mc_embed_signup-->
      <div v-else class="subscribe">&nbsp;</div>
    </div>
    <div class="fadeInto">
      <div id="lede" class="lede">
        <Lede v-if="live" id="ledeContent" @page="page"></Lede>
      </div>
      <div :class="showMap ? 'white' : 'black'" id="mapContainer">
        <Map :key="mapKey" id="map" :style="showMap ? { opacity: 1 } : { opacity: 0 }" class="map" @page="page"></Map>
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from './Arrow.vue'
import Lede from './Lede.vue'
import Map from './Map.vue'

export default {
  components: {
    Arrow,
    Lede,
    Map,
  },
  props: [
    'live'
  ],
  mounted: function() {
    window.addEventListener("resize", () => {
      this.mapKey = 'map_' + document.body.clientWidth
    });

    var page = document.getElementById('landing')
    var background = document.getElementById('background')
    var container = document.getElementById('container')
    var lede = document.getElementById('lede')
    var beforeMap = document.getElementById('beforeMap')
    var map = document.getElementById('map')
    var mapContainer = document.getElementById('mapContainer')
    var ledeContent = document.getElementById('ledeContent')

    this.$ga.page('/')

    var bg = 1;

    var bgShift = window.setInterval((() => {
      if (bg == 6) {
        bg = 1
      } else {
        bg++
      }
      background.style.opacity = 0

      var preload = new Image();
      preload.src = require('../assets/borneo.jpg');

      window.setTimeout((() => {
        background.classList = 'bg' + bg
        background.style.opacity = .7

        if (bg == 1) {
          this.photographer = 'Emin Özmen'
        } if (bg == 2) {
          this.photographer = 'Stuart Franklin'
        } if (bg == 3) {
          this.photographer = 'Jonas Bendiksen'
        } if (bg == 4) {
          this.photographer = 'Susan Meiselas'
        } if (bg == 5) {
          this.photographer = 'Thomas Dworzak'
        } if (bg == 6) {
          this.photographer = 'Chien-Chi Chang'
        }
      }), 1000)
    }), 5000)

    var oldScroll = window.scrollY
    var direction = 'down'

    window.onscroll = () => {
      if (oldScroll > window.scrollY) {
        direction = 'up'
      } else {
        direction = 'down'
      }
      oldScroll = window.scrollY;

      var max = background.offsetHeight
      var scroll = window.scrollY
      var scale = 1
      var toFadeOutElements = document.querySelectorAll('.toFadeOut')

      if (this.live) {
        Array.prototype.forEach.call(toFadeOutElements, function(el, i){
          el.style.opacity = 1 - (scroll / max).toFixed(1)
        });
      }

      if (scale <= 2) {
        scale += (scroll / max)
      }
      container.style.opacity = 1 - ((scroll / max).toFixed(1))
      background.style.transform = 'scale('+scale+')'

      if (scroll == 0) {
        container.style.opacity = 1
      }

      if (scroll >= max) {
        background.style.zIndex = -1
        container.style.zIndex = -1
      } else {
        background.style.zIndex = 1
        container.style.zIndex = 99
      }

      if (scroll > this.getOffset(lede).top + window.innerHeight && direction == 'down') {
        lede.style.background = 'none'
        this.showMap = true
        ledeContent.style.opacity = 1 - (scroll / lede.offsetHeight).toFixed(1)
        map.style.zIndex = 999
        map.style.opacity = 1
      } if (scroll < page.offsetHeight - 40 - window.innerHeight && direction == 'up')  {
        this.showMap = false
        ledeContent.style.opacity = 1
        map.style.zIndex = -2
        mapContainer.style.opacity = 1 - (scroll / window.offsetHeight).toFixed(1)
      }
    };
      if (this.readCookie('widescreenSwitch') == '1') {
        window.setTimeout(() => {
          this.eraseCookie('widescreenSwitch');
          window.scrollTo(0,4000)
          page.style.opacity = 1;
        }, 1000);
    } else {
      page.style.opacity = 1;
    }
  },
  methods: {
    page: function(value) {
      this.$emit('page', value);
      return value;
    },
     getOffset:function(el) {
      el = el.getBoundingClientRect();
      return {
        left: el.left + window.scrollX,
        top: el.top + window.scrollY
      }
    },
    createCookie: function(name,value,days) {
      if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
      }
      else var expires = "";
      document.cookie = name+"="+value+expires+"; path=/";
    },
    readCookie: function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    },
    eraseCookie: function(name) {
      this.createCookie(name,"",-1);
    },
    scrollTo: function(element, to, duration) {
        var start = element.scrollTop,
          change = to - start,
          currentTime = 0,
          increment = 20;
          Math.easeInOutQuad = function (t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };

        var animateScroll = function(){        
          currentTime += increment;
          var val = Math.easeInOutQuad(currentTime, start, change, duration);
          element.scrollTop = val;
          if(currentTime < duration) {
              window.setTimeout(() => animateScroll, increment);
          }
        };
        animateScroll();
    },
  },
  data: function() {
    return {
      showMap: false,
      photographer: 'Emin Özmen',
      mapKey: 'map_' + window.innerWidth
    }
  }
}
</script>

<style scoped lang="scss">
.landing {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}
#landing {
  transition: opacity 1s ease; 
  opacity: 0
}
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  transition: opacity 100ms ease;
  padding-bottom: 32px;
  & > .content, & > .subscribe {
    flex: 1
  }
}
.credit {
  display: flex;
  width: 420px;
  margin-left: auto;
  position: relative;
  z-index: 1;
  padding: 0 32px;
}
.pulitzer {
  flex-basis: 110%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  text-align: right;
  border-right: 1px solid #fff;
  padding-right: 32px;
  margin-right: 32px;
}
.magnum {
  padding-top: 16px;
  flex-basis: 80%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
.magnum img {
  width: 100%;
}
.magnum img, .pulitzer img {
  position: relative;
  top: 4px;
}
.content {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  padding: 32px;
  justify-content: center;
  @media (min-width: 1024px) {
    width: 768px;
  }
}
.subscribe {
  padding: 0 16px 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  position: relative;
  z-index: 3;
  padding: 0 32px;
  min-height: 90px;
}
#background {
  transition: opacity 1s ease, transform 100ms ease;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: .7;
  transform-origin: center;
}
.bg1 {
  background-image: url('../assets/azerbaijan-landing.jpg');
}
.bg2 {
  background-image: url('../assets/borneo.jpg');
}
.bg3 {
  background-image: url('../assets/greenland.jpg');
}
.bg4 {
  background-image: url('../assets/honduras.jpg');
}
.bg5 {
  background-image: url('../assets/tanzania.jpg');
}
.bg6 {
  background-image: url('../assets/philippines.jpg');
}
.ledeContent {
  transition: opacity 2s ease, background 2s ease;
}
.lede {
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%);
  transition: opacity 2s ease, background 2s ease;
}
.map {
  background: #fff;
  transition: opacity 2s ease;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -2;
  opacity: 0;
}
.spacer {
  background: #fff;
  transition: opacity 2s ease
}
.white {
  background: #fff;
}
.black {
  background: #000;
}
.fadeInto {
  position: relative;
}
.photographer {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  z-index: 3
}
@media (max-width: 1023px) {
  .subscribe {
    bottom: 3rem
  }
}
</style>
