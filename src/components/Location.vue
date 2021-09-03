<template>
<div class="location-container">
  <LocBtn :fetchWeather="fetchWeather" :query="query" @clicked="fetchCurrentLoc"/>
  <div class="container glassmorph">
      <input type="text" placeholder="Search location..." v-model="query" @keypress="fetchLoc" @blur="query = submitted">
  </div>
</div>
</template>

<script>
//modules
import axios from 'axios'
import LocBtn from './LocBtn.vue'

export default {
    components: {
        LocBtn
    },
    props: {
        api_key: String,
        fetchWeather: Function
    },
    data() {
        return {
            query: 'Rio de Janeiro',
            submitted: 'Rio de Janeiro'
        }
    },

    methods: {
        async fetchLoc(e) {
            if(e.key === "Enter"){
                this.submitted = this.query
                const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${this.query}&appid=${this.api_key}`)
                const data = await response.data
                this.fetchWeather(data.coord.lat, data.coord.lon)
                e.target.classList.remove('active')
                e.target.blur()
            }
        },
        fetchCurrentLoc(town) {
            this.query = town
        }
    }
}
</script>

<style scoped>
.location-container {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 45rem;
    height: 5rem;
    overflow: hidden;
}
input {
    width: 100%;
    height: 100%;
    border: none;
    text-transform: uppercase;
    font-size: 2rem;
    text-align: center;
    background-color: transparent;
    color: #fefefe;
    transition: color ease 0.5s, background-color ease 0.5s;
}
input:focus {
    color: #000;
    background-color: #fefefe;
    outline: 0;
}
input::placeholder {
    text-transform: capitalize;
}
</style>