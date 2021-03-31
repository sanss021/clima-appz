<template>
    <li class="container glassmorph">
        <fa-icon class="icon" :icon="getIcon(data.weather[0].main)" :key="data.weather[0].main"/>
        <div class="main">
            {{data.weather[0].main}}
        </div>
        <div class="day">
            {{getDay()}}
        </div>
        <div class="temp">
            <fa-icon icon="sun"/> <span>{{Math.floor(data.temp.day)}}</span> °C
        </div>
        <div class="temp">
            <fa-icon icon="moon"/> <span>{{Math.floor(data.temp.night)}}</span> °C
        </div>
    </li>
</template>

<script>
export default {
    props: {
        data: Object,
        getIcon: Function,
        index: Number,
        timeData: Number,
    },
    data() {
        return {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        }
    },
    methods: {
        getDay() {
            if(this.index === 0) {
                return 'Today'
            }else if(this.index === 1) {
                return 'Tomorrow'
            }else if(this.timeData + this.index < this.days.length) {
                return this.days[this.timeData + this.index]
            }else{
                return this.days[this.timeData + this.index - this.days.length]
            }
        }
    }
}
</script>

<style lang="css" scoped>
.container {
    margin-top: 32px;
    padding: 32px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    min-width: 160px;
}
.container *:not(:first-child) {
    margin-top: 8px;
}
.icon {
    font-size: 48px;
}
.day {
    font-size: 24px;
    font-weight: 100;
    text-transform: uppercase;
}
.main {
    font-size: 17.6px;
    font-weight: 300;
    text-transform: uppercase;
}
.temp {
    font-size: 16px;
}

@media only screen and (max-width: 525px) {
.container {
    min-width: 128px;
}
.icon {
      font-size: 38.4px;
}
.day {
    font-size: 19.2px;
}
.main {
    font-size: 14.08px;
}
.temp {
    font-size: 12.8px;
}

@media only screen and (max-width: 470px) {
.container {
    min-width: 102.4px;
}
.icon {
      font-size: 30.72px;
}
.day {
    font-size: 15.36px;
}
.main {
    font-size: 11.264px;
}
.temp {
    font-size: 10.24px;
}
}

@media only screen and (max-width: 420px) {
  .container {
      min-width: 250px;
  }
}

}
</style>