<template>
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
    <p>Background was <a href="http://www.freepik.com">designed by pikisuperstar / Freepik</a></p>
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

      document.getElementById('items').style.transform = `translateX(${-this.idx * 14.625}rem)`
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
  width: 43.5rem;
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
  margin-left: 0.5rem;
}
.button-container {
  display: flex;
  justify-content: space-between;
}
.btn {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  color: #fefefe;
  position: absolute;
  top: 9rem;
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
  left: -1.5rem;
}
#right {
  right: -1.5rem;
}

footer {
  position: absolute;
  bottom: 0;
  height: 2.5rem;
}

footer p a {
  text-decoration: none;
  color: #dddddd
}
</style>
