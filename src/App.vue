<template>
<div class="video-container">
  <div class="gradient"></div>
  <video autoplay loop muted>
    <source src="./assets/sunset_backgorund_video.mp4" type="video/mp4">
  </video>
</div>
<div class="global-container">
  <Location :api_key="API_KEY" :fetchWeather="fetchWeather"/>
  <CurrentWeather :data="currentData" :getIcon="getIcon" />
  <div class="carousel">
    <div class="carousel-outer">
      <ul class="carousel-items" id="items">
        <DailyWeather v-for="(day, index) in dailyData" :getIcon="getIcon" :data="day" :key="index" :timeData="timeData" :index="index"/>
      </ul>
      <button id="left" class="btn glassmorph" @click="idx--; moveCarousel()"><fa-icon icon="chevron-left"/></button>
      <button id="right" class="btn glassmorph" @click="idx++; moveCarousel()"><fa-icon icon="chevron-right"/></button>
    </div>
  </div>
  <footer>
    <p>Background was designed by <a href="https://www.youtube.com/watch?v=XGw3OgCBo_U">Visualdon</a></p>
  </footer>
</div>
</template>

<script>
//compontents
import CurrentWeather from './components/CurrentWeather.vue'
import DailyWeather from './components/DailyWeather.vue'
import Location from './components/Location.vue'
//modules
import axios from 'axios'

export default {
  name: 'App',
  components: {
    CurrentWeather,
    DailyWeather,
    Location,
  },
  created() {
    this.fetchWeather(this.LAT, this.LON)
    window.addEventListener('resize', function() {
      this.document.querySelector(".carousel-items").style.transform = "translateX(0)"
    })
  },
  data() {
    return {
      API_KEY: '58577cd766eef6c99ef192cf7d0c3734',
      UNITS: 'metric',
      LAT: '48.1351',
      LON: '11.5820',
      currentData: {},
      dailyData: [],
      timeData: {},
      idx: 0,
    }
  },
  methods: {
    async fetchWeather(lat, lon) {
      const response = await axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${this.UNITS}&appid=${this.API_KEY}`)
      const data = await response.data
      this.currentData = data.current
      this.dailyData = data.daily
      this.timeData = this.convertTZ(new Date(), data.timezone).getDay()
    },
    getIcon(main){
      switch(main){
        case "Thunderstorm":
        return "bolt"
        case "Drizzle":
        return "cloud-rain"
        case "Rain":
        return "cloud-showers-heavy"
        case "Snow":
        return "snowflake"
        case "Mist":
        return "smog"
        case "Fog":
        return "smog"
        case "Clear":
        return "sun"
        case "Clouds":
        return "cloud"
      }
    },
    moveCarousel() {
      if(this.idx > this.dailyData.length - 3) {
        this.idx = 0
      } else if(this.idx < 0) {
        this.idx = this.dailyData.length - 3
      }

      document.getElementById('items').style.transform = `translateX(${-this.idx * 234}px)`
    },
    convertTZ(date, tzString) {
      return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString('en-US', {timeZone: tzString}))
    }
  }
}
</script>

<style scoped>
.global-container {
  position: relative;
  min-height: 100vh;
}
.carousel {
  position: relative;
  width: 696px;
}
.carousel-outer {
  overflow: hidden;
}
.carousel-items {
  display: flex;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
  padding: 0;
  justify-content: flex-start;
}
.carousel-items *:not(:first-child) {
  margin-left: 8px;
}

@media only screen and (max-width: 800px) {
  .carousel {
    width: 100%;
  }
  .carousel-items * {
    margin: 5px
  }
  /* Carousel to list */
  #left, #right {
    display: none;
  }
  .carousel-outer {
    width: 100%;
  }
  .carousel-items {
      width: 100%;
      margin: 10px auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 1000px;
  }
}

.button-container {
  display: flex;
  justify-content: space-between;
}
.btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: #fefefe;
  position: absolute;
  top: 144px;
  z-index: 100;
}
.btn:hover {
  opacity: 0.9;
}
.btn:focus  {
  outline: none;
  background: rgba(255, 255, 255, 0.4);
}
#left {
  left: -24px;
}
#right {
  right: -24px;
}

footer {
  height: 2.5rem;
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
}

footer p a {
  text-decoration: none;
  color: #dddddd
}
</style>
