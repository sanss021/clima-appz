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
        /* ON SATURDAY, LAST DAILY IS BUGGED - NO DAY NAME */
        getDay() {
            if(this.index === 0) {
                return 'Today'
            }else if(this.index === 1) {
                return 'Tomorrow'
            }else if(this.timeData + this.index >= 6){
                return this.days[this.timeData + this.index - 6]    
            }
            return this.days[this.timeData + this.index]
        }
    }
}
</script>

<style lang="css" scoped>
.container {
    margin-top: 2rem;
    padding: 2rem;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    min-width: 10rem;
}
.container *:not(:first-child) {
    margin-top: 0.5rem;
}
.icon {
    font-size: 3rem;
}
.day {
    font-size: 1.5rem;
    font-weight: 100;
    text-transform: uppercase;
}
.main {
    font-size: 1.1rem;
    font-weight: 300;
    text-transform: uppercase;
}
</style>