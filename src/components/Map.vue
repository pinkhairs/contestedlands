<template>
  <div class="map" :key="key">
    <Rotate />
    <div id="map-container">

    </div>
  </div>
</template>

<script>
import Arrow from './Arrow.vue'
import Lede from './Lede.vue'
import Rotate from './Rotate.vue'
import * as d3 from "d3";

export default {
  mounted: function() {
    window.onorientationchange = () => { 
    var orientation = window.orientation; 
        switch(orientation) { 
            case 0:
            case 90:
            case -90: this.refreshMap()
        break; } 
    };
    var json = require('../assets/world.json');
    var mapEl = document.getElementById('map-container')

    var center = d3.geoCentroid(json)

    var projection = d3.geoMercator()
    .center(center)

    if (this.windowWidth < 600) {
      projection
      .scale(75)
      .translate([275,150])
    }

    if (this.windowWidth < 740) {
      projection
      .scale(110)
      .translate([380,190])
    }

    if (this.windowWidth < 769) {
      projection
      .scale(120)
      .translate([420,215])
    }

    if (this.windowWidth > 769 && this.windowWidth < 1025) {
      projection
      .scale(180)
      .translate([560,322])
    }

    if (this.windowWidth == 812) {
      projection
      .scale(140)
      .translate([480,250])
    }


    if (this.windowWidth > 1025) {
      projection
      .translate([550,272])
    }

    if (this.windowWidth > 1600) {
      projection
      .scale(175)
      .translate([600,310])
    }

    var path = d3
     .geoPath()
     .projection(projection);

    var map = d3.select("#map-container")
    var tooltip = map.append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)

    map.append('div')
    .html('<h3 class="caption">Select a region</h3>')
    .style('position', 'fixed')
    .style('bottom', '1rem')
    .style('color', '#000')
    .style('height', 20 + 'px')
    .style('background', '#fff')
    .style('box-shadow', 'inset 0 -2px 0 0 red')
    .append("rect")
    .attr('class', 'mapLabelBorder')
    .style('display', 'inline-block')

    map = map.append("svg")
    .attr('id', 'mapView')

    window.onresize = () => {
      this.handleResize
    };

    var countries = map
     .append('g')
     .attr('id', 'mapG')
     .selectAll("path")
     .data(json.features)
     .enter()
     .append("path")
     .attr('class', 'country')
     .attr('d', path)
     .attr('stroke', 'black')
     .attr('fill', 'black')


    var bbox = document.getElementById('mapG').getBoundingClientRect();
    map.attr("width", bbox.width + "px");
    map.attr("height", bbox.height + "px");


    var bbox = document.getElementById('mapG').getBBox();
    countries.attr("width", bbox.width + "px");
    countries.attr("height", bbox.height + "px");

    var azerbaijan = [45.0019873390568,39.7400035670496];
    var borneo = [101.07551557821333,6.204867051615892];
    var greenland = [-41.76379,76.62796];
    var philippines = [126.37681359263748,8.414706325713354];
    var honduras = [-87.31665442579549,12.984685777229004];
    var tanzania = [33.9037111971046,-0.95];

    // var circles = map.selectAll("circle").data([azerbaijan,borneo, greenland,philippines,honduras,tanzania]).enter()
    var circles = map.selectAll("circle").data(json.features).enter()

    var labels = map.selectAll("text")
    .data(json.features)
    .enter()
    .append("text")
    .attr('class', 'caption mapLabel')
    .attr("transform", (d) => {
      if (d.properties.name_long == 'Greenland') {
        return "translate(" + parseInt(path.centroid(d)[0] - 24) + ", " + parseInt(path.centroid(d)[1] + 88) + ")";
      } else if (d.properties.name_long == 'Azerbaijan') {
        return "translate(" + parseInt(path.centroid(d)[0] + 24) + ", " + parseInt(path.centroid(d)[1] + 7) + ")";
      } else if (d.properties.name_long == 'Tanzania') {
        return "translate(" + parseInt(path.centroid(d)[0] - 44) + ", " + parseInt(path.centroid(d)[1] - 18) + ")";
      } else if (d.properties.name_long == 'Malaysia') {
        return "translate(" + parseInt(path.centroid(d)[0] - 70) + ", " + parseInt(path.centroid(d)[1] + 40) + ")";
      } else if (d.properties.name_long == 'Philippines') {
        return "translate(" + parseInt(path.centroid(d)[0] + 20) + ", " + parseInt(path.centroid(d)[1] + 4) + ")";
      } else if (d.properties.name_long == 'Honduras') {
        return "translate(" + parseInt(path.centroid(d)[0] - 60) + ", " + parseInt(path.centroid(d)[1] + 24) + ")";
      }
    }).on("mouseover", (d, i) => {
        var text = []
        text['Azerbaijan'] = `
          <div class="card">
            <h2 class="caption">Azerbaijan</h2>
            <h2>A Forgotten People</h2>
            <p><span style="color: red">&bull;</span> Photos: Emin Özmen<br><span style="color: red">&bull;</span> Story: Elena Gooray</p>
            <hr />
            <p class="caption">Without the Azerbaijani government’s structural support and full recognition, the Talysh people fight to preserve their language and culture.</p>
          </div>
        `;
        text['Greenland'] = `
          <div class="card">
            <h2 class="caption">Greenland</h2>
            <h2>Greenland’s Vanishing Villages</h2>
            <p><span style="color: red">&bull;</span> Photos: Jonas Bendiksen<br><span style="color: red">&bull;</span> Story: Kate Wheeling</p>
            <hr />
            <p class="caption">The Danish government’s push for modernization left many small Greenland hunting communities reeling, and now their women may never return.</p>
          </div>
        `;
        text['Malaysia'] = `
          <div class="card">
            <h2 class="caption">Malaysia</h2>
            <h2>Displacement in Sarawak</h2>
            <p><span style="color: red">&bull;</span> Photos: Stuart Franklin<br><span style="color: red">&bull;</span> Story: Francie Diep</p>
            <hr />
            <p class="caption">The Malaysian government has routinely put private-sector interests and infrastructure projects ahead of the livelihoods of indigenous people.</p>
          </div>
        `;
        text['Tanzania'] = `
          <div class="card">
            <h2 class="caption">Tanzania</h2>
            <h2>The Disappearing Pastures of the Maasai</h2>
            <p><span style="color: red">&bull;</span> Photos: Thomas Dworzak<br><span style="color: red">&bull;</span> Story: Ted Scheinman</p>
            <hr />
            <p class="caption">In northern Tanzania, not far from the Kenyan border, the Maasai people are seeing their ancestral lands claimed by miners and the government<span style="letter-spacing: -3px">--</span> all amid a serious drought.</p>
          </div>
        `;
        text['Honduras'] = `
          <div class="card">
            <h2 class="caption">Honduras</h2>
            <h2>Last Resort</h2>
            <p><span style="color: red">&bull;</span> Photos: Susan Meiselas<br><span style="color: red">&bull;</span> Story: Sarah Kinosian</p>
            <hr />
            <p class="caption">More than two centuries after settling in Honduras, the Garifuna people are still fighting for a place to raise their families.</p>
          </div>
        `;
        text['Philippines'] = `
          <div class="card">
            <h2 class="caption">Philippines</h2>
            <h2>A Retreat from Massacre</h2>
            <p><span style="color: red">&bull;</span> Photos: Chien-Chi Chang<br><span style="color: red">&bull;</span> Story: Max Ufberg</p>
            <hr />
            <p class="caption">The T’boli-Dulangan Manobo, an indigenous group in the Philippines, lived peacefully in the village of Sitio Datalbonglangon<span style="letter-spacing: -3px">--</span> until the country’s armed forces showed up.</p>
          </div>
        `;

      tooltip.html(text[d.properties.name_long])   
      .on('click', () => {
        var links = []
        links['Azerbaijan'] = '/azerbaijan'
        links['Greenland'] = '/greenland'
        links['Malaysia'] = '/borneo'
        links['Tanzania'] = '/tanzania'
        links['Philippines'] = '/philippines'
        links['Honduras'] = '/honduras'

        this.$emit('page', links[d.properties.name_long])
      }) 

      var mouseX = d3.event.clientX,
      mouseY = d3.event.clientY,
      tooltipWidth = tooltip.node().getBoundingClientRect().width,
      tooltipHeight = tooltip.node().getBoundingClientRect().height,
      mapWidth = map.node().getBoundingClientRect().width,
      mapHeight = map.node().getBoundingClientRect().height,
      side = ((window.innerWidth - mapWidth)/2);

      if (tooltipHeight - mouseY > 0) {
        var top = '20px'
        var bottom = 'auto'
      } else {
        var bottom =  (window.innerHeight - (d3.event.clientY - 8)) + 'px'
        var top = 'auto'
      }

      if (tooltipWidth + mouseX > window.innerWidth) {
        var left = 'auto'
        var right = '20px'
      } else {
        var left =  d3.event.clientX + 'px'
        var right = 'auto'
      }

      tooltip.transition()   
        .duration(160)    
        .style("opacity", 1)   
        .style("left", () => {
          return left
        })
        .style("right", () => {
          return right
        })
        .style("bottom", () => {
          return bottom
        })
        .style('top', () => {
          return top
        });

        this.X = d3.event.clientX
        this.Y = d3.event.clientY

      })
    .style('fill', '#888')
    .on('click', (d) => {
      var links = []
      links['Azerbaijan'] = '/azerbaijan'
      links['Greenland'] = '/greenland'
      links['Malaysia'] = '/borneo'
      links['Tanzania'] = '/tanzania'
      links['Philippines'] = '/philippines'
      links['Honduras'] = '/honduras'
      this.$emit('page', links[d.properties.name_long])
    })
    .attr("cx", function (d) { return d.properties.dx || "0"; })
    .attr("cy", function (d) { return d.properties.dy || "0.35em"; })
    .text(function (d) {
      if (d.properties.name_long == 'Greenland' ||
        d.properties.name_long == 'Azerbaijan' ||
        d.properties.name_long == 'Malaysia' ||
        d.properties.name_long == 'Tanzania' ||
        d.properties.name_long == 'Honduras' ||
        d.properties.name_long == 'Philippines') {
        return d.properties.name_long;
      }
    }); var borders = map.selectAll("rect")
    .data(json.features)
    .enter()
    .append("rect")
    .attr('class', 'mapLabelBorder')
    .attr("transform", function (d) {
      if (d.properties.name_long == 'Greenland') {
        return "translate(" + parseInt(path.centroid(d)[0] - 24) + ", " + parseInt(path.centroid(d)[1] + 92) + ")";
      } else if (d.properties.name_long == 'Azerbaijan') {
        return "translate(" + parseInt(path.centroid(d)[0] + 24) + ", " + parseInt(path.centroid(d)[1] + 10) + ")";
      } else if (d.properties.name_long == 'Tanzania') {
        return "translate(" + parseInt(path.centroid(d)[0] - 44) + ", " + parseInt(path.centroid(d)[1] - 14) + ")";
      } else if (d.properties.name_long == 'Malaysia') {
        return "translate(" + parseInt(path.centroid(d)[0] - 70) + ", " + parseInt(path.centroid(d)[1] + 44) + ")";
      } else if (d.properties.name_long == 'Philippines') {
        return "translate(" + parseInt(path.centroid(d)[0] + 20) + ", " + parseInt(path.centroid(d)[1] + 8) + ")";
      } else if (d.properties.name_long == 'Honduras') {
        return "translate(" + parseInt(path.centroid(d)[0] - 60) + ", " + parseInt(path.centroid(d)[1] + 28) + ")";
      }
    })
    .attr("cx", function (d) { return d.properties.dx || "0"; })
    .attr("cy", function (d) { return d.properties.dy || "0.35em"; })
    .style("display", function(d) {
      if (d.properties.name_long == 'Greenland' ||
        d.properties.name_long == 'Azerbaijan' ||
        d.properties.name_long == 'Malaysia' ||
        d.properties.name_long == 'Tanzania' ||
        d.properties.name_long == 'Honduras' ||
        d.properties.name_long == 'Philippines'
      ) {
        return 'inline-block';
      }
    ;}).attr('width', function(d) {
      if (d.properties.name_long == 'Greenland') {
        return '60px';
      } else if (d.properties.name_long == 'Azerbaijan') {
        return '65px';
      } else if (d.properties.name_long == 'Tanzania') {
        return '53px';
      } else if (d.properties.name_long == 'Malaysia') {
        return '53px';
      } else if (d.properties.name_long == 'Philippines') {
        return '68px';
      } else if (d.properties.name_long == 'Honduras') {
        return '55px';
      }
    })

    var stillDot = circles.append("circle")
      .attr("cx", function (d) {
        var x = path.centroid(d)[0]
        if (d.properties.name_long == 'Greenland') {
          return x - 36
        }
        if (d.properties.name_long == 'Azerbaijan') {
          return x + 3
        }
        if (d.properties.name_long == 'Honduras') {
          return x - 3
        }
        if (d.properties.name_long == 'Philippines') {
          return x + 6
        }
        return x
      })
      .attr("cy", function (d) {
        var y = path.centroid(d)[1]
        if (d.properties.name_long == 'Greenland') {
          return y + 96
        }
        if (d.properties.name_long == 'Azerbaijan') {
          return y + 8
        }
        if (d.properties.name_long == 'Malaysia') {
          return y + 6
        }
        if (d.properties.name_long == 'Tanzania') {
          return y - 3
        }
        if (d.properties.name_long == 'Honduras') {
          return y - 12
        }
        if (d.properties.name_long == 'Philippines') {
          return y + 16
        }
        return y
      })
      .attr("r", "3px")
      .attr("fill", "red")
      .data(json.features)
      .attr('class', 'stillDot')
      .attr('id', (d, i) => {
        this.dots[i] = d.properties.name_long;
      }).style("display", function(d) {
      if (d.properties.name_long == 'Greenland' ||
        d.properties.name_long == 'Azerbaijan' ||
        d.properties.name_long == 'Malaysia' ||
        d.properties.name_long == 'Tanzania' ||
        d.properties.name_long == 'Honduras' ||
        d.properties.name_long == 'Philippines'
      ) {
        return 'inline-block';
      }
    ;})
      .on('click', (d) => {
        var links = []
        links['Azerbaijan'] = '/azerbaijan'
        links['Greenland'] = '/greenland'
        links['Malaysia'] = '/borneo'
        links['Tanzania'] = '/tanzania'
        links['Philippines'] = '/philippines'
        links['Honduras'] = '/honduras'
        this.$emit('page', links[d.properties.name_long])
      })

    var hoverDot = circles.append("circle")
      .attr("cx", function (d) {
        var x = path.centroid(d)[0]
        if (d.properties.name_long == 'Greenland') {
          return x - 36
        }
        if (d.properties.name_long == 'Azerbaijan') {
          return x + 3
        }
        if (d.properties.name_long == 'Honduras') {
          return x - 3
        }
        if (d.properties.name_long == 'Philippines') {
          return x + 6
        }
        return x
      })
      .attr("cy", function (d) {
        var y = path.centroid(d)[1]
        if (d.properties.name_long == 'Greenland') {
          return y + 96
        }
        if (d.properties.name_long == 'Azerbaijan') {
          return y + 8
        }
        if (d.properties.name_long == 'Malaysia') {
          return y + 6
        }
        if (d.properties.name_long == 'Tanzania') {
          return y - 3
        }
        if (d.properties.name_long == 'Honduras') {
          return y - 12
        }
        if (d.properties.name_long == 'Philippines') {
          return y + 16
        }
        return y
        })
      .attr("r", "12px")
      .attr('fill', 'rgba(0,0,0,0)')
      .attr('class', 'hoverDot')
      .data(json.features)
      .style("display", function(d) {
        if (d.properties.name_long == 'Greenland' ||
          d.properties.name_long == 'Azerbaijan' ||
          d.properties.name_long == 'Malaysia' ||
          d.properties.name_long == 'Tanzania' ||
          d.properties.name_long == 'Honduras' ||
          d.properties.name_long == 'Philippines'
        ) {
          return 'inline-block';
        }
      ;}).on("mouseover", (d, i) => {
        var text = []
        text['Azerbaijan'] = `
          <div class="card">
            <h2 class="caption">Azerbaijan</h2>
            <h2>A Forgotten People</h2>
            <p><span style="color: red">&bull;</span> Photos: Emin Özmen<br><span style="color: red">&bull;</span> Story: Elena Gooray</p>
            <hr />
            <p class="caption">Without the Azerbaijani government’s structural support and full recognition, the Talysh people fight to preserve their language and culture.</p>
          </div>
        `;
        text['Greenland'] = `
          <div class="card">
            <h2 class="caption">Greenland</h2>
            <h2>Greenland’s Vanishing Villages</h2>
            <p><span style="color: red">&bull;</span> Photos: Jonas Bendiksen<br><span style="color: red">&bull;</span> Story: Kate Wheeling</p>
            <hr />
            <p class="caption">The Danish government’s push for modernization left many small Greenland hunting communities reeling, and now their women may never return.</p>
          </div>
        `;
        text['Malaysia'] = `
          <div class="card">
            <h2 class="caption">Malaysia</h2>
            <h2>Displacement in Sarawak</h2>
            <p><span style="color: red">&bull;</span> Photos: Stuart Franklin<br><span style="color: red">&bull;</span> Story: Francie Diep</p>
            <hr />
            <p class="caption">The Malaysian government has routinely put private-sector interests and infrastructure projects ahead of the livelihoods of indigenous people.</p>
          </div>
        `;
        text['Tanzania'] = `
          <div class="card">
            <h2 class="caption">Tanzania</h2>
            <h2>The Disappearing Pastures of the Maasai</h2>
            <p><span style="color: red">&bull;</span> Photos: Thomas Dworzak<br><span style="color: red">&bull;</span> Story: Ted Scheinman</p>
            <hr />
            <p class="caption">In northern Tanzania, not far from the Kenyan border, the Maasai people are seeing their ancestral lands claimed by miners and the government<span style="letter-spacing: -3px">--</span> all amid a serious drought.</p>
          </div>
        `;
        text['Honduras'] = `
          <div class="card">
            <h2 class="caption">Honduras</h2>
            <h2>Last Resort</h2>
            <p><span style="color: red">&bull;</span> Photos: Susan Meiselas<br><span style="color: red">&bull;</span> Story: Sarah Kinosian</p>
            <hr />
            <p class="caption">More than two centuries after settling in Honduras, the Garifuna people are still fighting for a place to raise their families.</p>
          </div>
        `;
        text['Philippines'] = `
          <div class="card">
            <h2 class="caption">Philippines</h2>
            <h2>A Retreat from Massacre</h2>
            <p><span style="color: red">&bull;</span> Photos: Chien-Chi Chang<br><span style="color: red">&bull;</span> Story: Max Ufberg</p>
            <hr />
            <p class="caption">The T’boli-Dulangan Manobo, an indigenous group in the Philippines, lived peacefully in the village of Sitio Datalbonglangon<span style="letter-spacing: -3px">--</span> until the country’s armed forces showed up.</p>
          </div>
        `;
      tooltip.html(text[d.properties.name_long])   
      .on('click', (d) => {
        var links = []
        links['Azerbaijan'] = '/azerbaijan'
        links['Greenland'] = '/greenland'
        links['Malaysia'] = '/borneo'
        links['Tanzania'] = '/tanzania'
        links['Philippines'] = '/philippines'
        links['Honduras'] = '/honduras'
        this.$emit('page', links[d.properties.name_long])
      }) 

      var mouseX = d3.event.clientX,
      mouseY = d3.event.clientY,
      tooltipWidth = tooltip.node().getBoundingClientRect().width,
      tooltipHeight = tooltip.node().getBoundingClientRect().height,
      mapWidth = map.node().getBoundingClientRect().width,
      mapHeight = map.node().getBoundingClientRect().height,
      side = ((window.innerWidth - mapWidth)/2);

      if (tooltipHeight - mouseY > 0) {
        var top = '20px'
        var bottom = 'auto'
      } else {
        var bottom =  (window.innerHeight - (d3.event.clientY - 8)) + 'px'
        var top = 'auto'
      }

      if (tooltipWidth + mouseX > window.innerWidth) {
        var left = 'auto'
        var right = '20px'
      } else {
        var left =  d3.event.clientX + 'px'
        var right = 'auto'
      }

      tooltip.transition()   
        .duration(160)    
        .style("opacity", 1)   
        .style("left", () => {
          return left
        })
        .style("right", () => {
          return right
        })
        .style("bottom", () => {
          return bottom
        })
        .style('top', () => {
          return top
        });

        this.X = d3.event.clientX
        this.Y = d3.event.clientY

      })
    var dot = circles.append("circle")
      .attr("cx", function (d) {
        var x = path.centroid(d)[0]
        if (d.properties.name_long == 'Greenland') {
          return x - 36
        }
        if (d.properties.name_long == 'Azerbaijan') {
          return x + 3
        }
        if (d.properties.name_long == 'Honduras') {
          return x - 3
        }
        if (d.properties.name_long == 'Philippines') {
          return x + 6
        }
        return x
      })
      .attr("cy", function (d) {
        var y = path.centroid(d)[1]
        if (d.properties.name_long == 'Greenland') {
          return y + 96
        }
        if (d.properties.name_long == 'Azerbaijan') {
          return y + 8
        }
        if (d.properties.name_long == 'Malaysia') {
          return y + 6
        }
        if (d.properties.name_long == 'Tanzania') {
          return y - 3
        }
        if (d.properties.name_long == 'Honduras') {
          return y - 12
        }
        if (d.properties.name_long == 'Philippines') {
          return y + 16
        }
        return y
      })
      .attr("r", "3px")
      .attr("fill", "red")
      .attr('class', 'moveDot')
      .attr('padding', '100px')
      .data(json.features)
      .style("display", function(d) {
        if (d.properties.name_long == 'Greenland' ||
          d.properties.name_long == 'Azerbaijan' ||
          d.properties.name_long == 'Malaysia' ||
          d.properties.name_long == 'Tanzania' ||
          d.properties.name_long == 'Honduras' ||
          d.properties.name_long == 'Philippines'
        ) {
          return 'inline-block';
        }
      })
      .on('click', (d) => {
        var links = []
        links['Azerbaijan'] = '/azerbaijan'
        links['Greenland'] = '/greenland'
        links['Malaysia'] = '/borneo'
        links['Tanzania'] = '/tanzania'
        links['Philippines'] = '/philippines'
        links['Honduras'] = '/honduras'
        this.$emit('page', links[d.properties.name_long])
      })
      map.on('mousemove', (event) => {
        var showTooltip = this.showTooltip(d3.event.clientX, d3.event.clientY)
        if (!showTooltip) {   
          tooltip.transition()   
            .duration(160)    
            .style("opacity", 0)  
        }
      })

    dot.transition().duration(900).attr("r", 24).style('opacity', 0)
    .transition().duration(900).attr("r", 0).style('opacity', 0)
    .transition().duration(900).attr("r", 3).style('opacity', 1)
    
  setInterval(function (){
    dot.transition().duration(900).attr("r", 24).style('opacity', 0)
    .transition().duration(900).attr("r", 0).style('opacity', 0)
    .transition().duration(900).attr("r", 3).style('opacity', 1)
    }.bind(dot), 2700);
  },
  components: {
    Rotate
  },
  data: function() {
    return {
      X: 0,
      Y: 0,
      clientX: 0,
      clientY: 0,
      dots: [],
      windowWidth: window.innerWidth,
      key: 'map'
    }
  },
  methods: {
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
      createCookie(name,"",-1);
    },
    refreshMap: function() {
      this.createCookie('widescreenSwitch', '1', 1);
      window.location.reload()
    },
    showTooltip: function(clientX, clientY) {
      var threshold = 6
      if ((this.X > clientX + threshold || this.X < clientX - threshold) && (this.Y > clientY + threshold || this.Y < clientY - threshold)) {
        return false
      } else {
        return true
      }
    },
    handleResize: function() {
      this.windowWidth = window.innerWidth
    }
  },
}
</script>

<style lang="scss">
#map-container {
  background: #fff;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  justify-content: center;
  z-index: 0;
  svg rect:not(.mapLabelBorder) {
    border: 2px solid black;
    fill: #000;   /* map background colour */
  }
}
#mapView {
  display: block;
}
#mapG {
  position: absolute;
  top: 0;
  left: 0;
}
.mapLabel {
  font-size: 10px;
  padding-bottom: 3px;
  display: inline-block;
  color: #888;
}
.mapLabelBorder {
  display: none;
  fill: red;
  height: 2px;
}
.tooltip {
  background: #fff;
  color: #000;
  position: fixed;
  padding: 1.5rem;
  width: 200px;
  border: 2px red solid;
  box-shadow: 8px -8px 0 2px red;
  z-index: 999;
  font-size: 0.85rem;
  * + * {
    margin-top: 0.5rem
  }
}
.stillDot, .moveDot, .hoverDot {
  display: none;
}
.hoverDot {
  cursor: pointer
}
</style>
