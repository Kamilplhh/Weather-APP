<template>
    <div class="text-white mb-8">
        <div class="places-input text-gray-800">
            <input v-model="location" @input="fetchdata" type="text" class="w-full">
        </div>
        <div class="weather-container font-sans w-128 max-w-lg overflow-hidden rounded-lg bg-gray-900 shadow-lg mt-4">
            <div class="current-weather flex items-center justify-between px-6 py-8">
                <div class="flex items-center">
                    <div>
                        <div class="text-6xl font-semibold">{{ currentTemp }}</div>
                    </div>
                    <div class="mx-5">
                        <div class="font-semibold">{{ currentStatus }},<br>
                            Wind: {{ currentWind }}</div>
                        <div>{{ location }}</div>
                    </div>
                </div>
                <div>
                    <canvas ref="iconCurrent" id="iconCurrent" width="96" height="96"></canvas>
                </div>
            </div>

            <div class="future-weather text-sm bg-gray-800 px-6 py-8 overflow-hidden">
                <div v-for="forecast in forecasts" class="flex items-center">
                    <div class="w-1/6 text-lg text-gray-200">MON</div>
                    <div class="w-3/6 px-4 flex items-center">
                        <div>Wind:</div>
                        <div class="ml-3">{{ forecast.wind }}</div>
                    </div>
                    <div class="w-2/6 text-3xl text-center">
                        <div>{{ forecast.temperature }}</div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.fetchdata()
        },
        data() {
            return {
                location: ''
            }
        },
        methods: {
            fetchdata() {
                var skycons = new Skycons({'color': 'white'});

                const today = new Date();
                const time = today.getHours();
                let icon = '';
                if(time > 8 && time < 20) {
                    icon = 'clear-day';
                }else {
                    icon = 'clear-night';
                }

                fetch('https://goweather.herokuapp.com/weather/' + this.location)
                .then(response => response.json())
                .then(data => {
                    
                    this.currentTemp = data.temperature,
                    this.currentStatus = data.description,
                    this.currentWind = data.wind,
                    this.forecasts = data.forecast,
                    
                    skycons.add('iconCurrent', icon)
                    skycons.play()
                })
            },
        }
    }
</script>
