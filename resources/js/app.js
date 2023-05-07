import './bootstrap';
import { createApp } from 'vue';
import '../css/app.css'; 
import weatherapp from './components/weatherapp.vue';

const app = createApp({});

app.component('weatherapp', weatherapp);

app.mount('#app');
