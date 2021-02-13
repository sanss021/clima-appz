<template>
    <div class="btn glassmorph" @click="geoLoc"><fa-icon class="icon" icon="map-marker-alt"/></div>
</template>

<script>

import axios from 'axios'

export default {
    name: "LocBtn",
    props: {
      query: String,
      fetchWeather: Function
    },
    data() {
      return {
        API_KEY: "0e8ae732ae6d40459a76862ba93a2ad9",
      }
    },
    methods: {
      geoLoc() {
        navigator.geolocation.getCurrentPosition(this.fetchCurrentLoc, console.log)
      },
      async fetchCurrentLoc(position) {
        const {latitude, longitude} = position.coords
        const response = await axios(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${this.API_KEY}`)
        const data = await response.data
        const town = data.results[0].components.town
        this.$emit('clicked', town)
        this.fetchWeather(latitude, longitude)
      }
    }
}
</script>

<style scoped>
.btn {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  color: #fefefe;
  top: 9rem;
  z-index: 100;
  margin-right: 2rem;
}
.btn * {
  width: 50%;
  height: 50%;
  transform: translate(50%, 50%);
}
.btn:hover {
  opacity: 0.9;
}
.btn:focus  {
  outline: none;
  background: rgba(255, 255, 255, 0.4);
}
</style>