import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {},
      currentLat: 40.7608,
      currentLon: -111.876183,
      map: null,
      marker: null,
  },

  getters:{
    gotData: state =>{
      return state.data? true: false;
    },
    getCityName: state => state.data.name,

    getSunset: state => {
      if (state.data.sys) {
        let time = state.data.sys.sunset;
        let date = new Date(time * 1000);
        let hour = date.getHours();
        let minutes = date.getMinutes();
        return `${hour}:${minutes}`;
      }
      return "No Sunset Data";
    },
    getSunRise: state =>{
      if (state.data.sys) {
        let time = state.data.sys.sunrise;
        let date = new Date(time * 1000);
        let hour = date.getHours();
        let minutes = `0${date.getMinutes()}`;
        return `${hour}:${minutes.substr(-2)}`;
      }
      return "No Sunrise data";
    },
    getCondition:  state => {
      return state.data.weather ? state.data.weather[0].description : "";
    },
    getTemp: state => {
      return state.data.main ? state.data.main.temp : "";
    },
    getHumidity: state => {
      return state.data.main ? `${state.data.main.humidity}% `: "";
    },

    getWindSpeed:state => {
      return state.data.wind ? `${state.data.wind.speed} mph` : "";
    },
    getWindirection: state => {
      return state.data.wind ? `${state.data.wind.deg} degrees` : "";
    },
  },
  mutations: {
    setWeatherData(state, data){
      state.data= data
    }
  },
  actions: {
    getWeatherData({commit}, payload){
      axios({
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?lat=${payload.currentLat}&lon=${payload.currentLon}&units=imperial&appid=6d78fcf2b6ddf4f00ae680a37639b3d6`,
      }).then((res) => {
        commit('setWeatherData', res.data) ;
      });
    },
  },
 
})
