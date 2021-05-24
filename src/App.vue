<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <div class="d-flex align-center">
        <v-btn text class="title">
          <v-icon class="yellow--text mr-1">mdi-weather-partly-cloudy</v-icon>
          Weather <span class="red--text">Up</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <div class="my-5">
        <h1 class="display-3 text-center grey--text">Welcome to WeatherUp</h1>
        <p class="text-center grey--text lighten-1">
          Please drag the location marker on the map to see the current weather
          information for that location.
        </p>
      </div>
      <v-container class="my-5">
        <v-row>
          <v-col cols="12" sm="12" md="8" lg="8">
            <v-card>
            <div id="map"></div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="12" md="4" lg="4">
            <v-simple-table class="green lighten-1" dark v-if="gotData == true">
              <template v-slot:default>
                <tbody data-cy="city-name">
                  <tr>
                    <td>Location</td>
                    <td >{{getCityName}}</td>
                  </tr>
                  <tr>
                    <td>Condition</td>
                    <td>{{getCondition }}</td>
                  </tr>
                  <tr>
                    <td>Temperature</td>
                    <td>{{ getTemp }} F</td>
                  </tr>
                  <tr>
                    <td>Humidity</td>
                    <td>{{ getHumidity }}</td>
                  </tr>
                  <tr>
                    <td>Sunrise</td>
                    <td>{{ getSunRise }}</td>
                  </tr>
                  <tr>
                    <td>Sunset</td>
                    <td>{{ getSunset }}</td>
                  </tr>

                  <tr>
                    <td>Wind Speed</td>
                    <td>{{ getWindSpeed }}</td>
                  </tr>
                  <tr>
                    <td>Wind Direction</td>
                    <td>{{ getWindirection }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="green" class="pa-5 text-center" dark>
      <v-col color="green" cols="12">
          {{new Date().getFullYear()}} -- <strong>WeatherUp</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { Loader } from "google-maps";
import {mapGetters} from 'vuex'

export default {
  name: "App",

  data() {
    return {
      locationCoordinates:{
        currentLat: this.$store.state.currentLat,
        currentLon: this.$store.state.currentLon,},
      map: null,
      marker: null,
    };
  },
  mounted() {
    this.initMap();
    this.$store.dispatch('getWeatherData', this.locationCoordinates)
  },

  methods: {
    initMap: async function() {
      const loader = new Loader("AIzaSyDWlf_6g_PrBIvBs5tyj92-M3f7NrRHCd8");
      const google = await loader.load();
      console.log(google);
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.$store.state.currentLat,
          lng: this.$store.state.currentLon,
        },
        zoom: 8,
      });

      let coordinates = new google.maps.LatLng(
        this.$store.state.currentLat,
        this.$store.state.currentLon
      );
      this.marker = new google.maps.Marker({
        position: coordinates,
        map: this.map,
        draggable: true,
      });
      google.maps.event.addListener(this.marker, "dragend", (e) => {
        this.locationCoordinates.currentLat = e.latLng.lat()
        this.locationCoordinates.currentLon = e.latLng.lng()
        this.$store.dispatch('getWeatherData', this.locationCoordinates)
      });
    },
  },
  computed: {
    ...mapGetters([
      'getCityName',
      'gotData',
      'getSunset',
      'getSunRise',
      'getCondition',
       'getTemp',
       'getHumidity',
       'getWindSpeed',
       'getWindirection'
    ])
     
  },
};
</script>

<style>
#map {
  height: 400px;
  width: 100%;
}
</style>
