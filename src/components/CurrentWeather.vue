<template>
<div class="container glassmorph">
    <div class="important" v-if="(typeof data.weather != 'undefined')">
        <div class="icon-container">
            <fa-icon class="icon" :icon="getIcon(data.weather[0].main)" :key="data.weather[0].main"/>
        </div>
        <div class="info">
            <div class="main">
                {{data.weather[0].main}}
            </div>
            <div v-if="data.weather[0].main.toLowerCase() !== data.weather[0].description.toLowerCase()" class="description">
                {{data.weather[0].description}}
            </div>
            <div class="temp">
                <span>{{Math.floor(data.temp)}}</span> °C
            </div>
        </div>
    </div>
     <div class="other">
        <div class="feels-like">
            <fa-icon class="icon" icon="user"/> <span>{{Math.floor(data.feels_like)}}</span>°C
        </div>
        <div class="clouds">
            <fa-icon class="icon" icon="cloud"/> <span>{{data.clouds}}</span>%
        </div>
        <div class="humidity">
            <fa-icon class="icon" icon="tint"/> <span>{{data.humidity}}</span>%
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        data: Object,
        getIcon: Function
    }
}
</script>

<style lang="css" scoped>
.important .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10rem;
}

.important .icon {
    color: #fefefe;
}

.container {
    margin-top: 3rem;
    position: relative;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50rem;
}

.other {
    /*position: absolute;
    bottom: 100px;*/
    margin-top: 3rem;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    border-top: 1px solid #fefefe7c;
    padding: 2rem 0rem 0rem 0rem
}

.other * {
    font-size: 1rem;
}

.other * span, .other * .icon {
    font-size: 1.5rem;
}

.important {
    /*position: absolute;
    top: 100px;*/
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}

.important * {
    width: 50%;
}

.info {
    display: flex;
    align-items:center;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
}

.info * {
    width: 100%;
}

.main {
    font-size: 5rem;
    font-weight: 100;
    text-transform: uppercase;
}

.description {
    font-size: 1.5rem;
}

.temp {
    margin-top: 2rem;
    font-size: 2rem;
}

.temp span {
    font-size: 5rem;
    font-weight: 100;
}


</style>