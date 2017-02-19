<template>
  <div class="home">
    <div v-if="!reservations">
        <md-card md-with-hover>
          <md-card-header>
            <strong>Authentication</strong>
          </md-card-header>

          <md-card-content>

            <form novalidate @submit.stop.prevent="buttonAuthorizeClick">
              <md-input-container>
                <label>Email</label>
                <md-input placeholder="your@email.com" v-model="username"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Your password</label>
                <md-input placeholder="" type="password" v-model="password"></md-input>
              </md-input-container>

              <md-button class="md-fab" type="submit">
                <md-icon>loop</md-icon>
              </md-button>
              <md-spinner md-indeterminate v-if="loading"></md-spinner>
            </form>

          </md-card-content>
        </md-card>
      </div>

    <div v-if="reservations">

      <md-layout md-gutter>
        <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100">
          <gmap-map
              :center="center"
              :zoom="2"
              style="width: 100%; height: 600px"
            >
              <gmap-marker
                v-for="m in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
              ></gmap-marker>
          </gmap-map>
        </md-layout>
      </md-layout>

      <md-layout md-gutter>

        <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="50" v-for="reservation in reservations">
          <md-card md-with-hover>
            <md-card-header>
              <md-avatar>
                <img :src="reservation.host_picture_thumbnail_url" alt="host thumbnail">
              </md-avatar>

              <div class="md-title">{{ reservation.country }}</div>
              <div class="md-subhead">{{ reservation.city }}</div>
            </md-card-header>

            <md-card-media>
              <img :src="reservation.listing_picture_url" alt="listing picture" style="width: 300px;">
            </md-card-media>

            <md-card-content>
              <strong>Check-in</strong>: {{ reservation.check_in }}
              <br>
              <strong>Check-out</strong>: {{ reservation.check_out }}
              <br>
              <br>
              <strong>Total price: {{ reservation.total_price }}</strong>
            </md-card-content>
          </md-card>
        </md-layout>

      </md-layout>

      <p>
        <chart :data="reservations"></chart>
      </p>

    </div> <!-- if reservations -->

  </div>
</template>

<script>
const { ipcRenderer } = window.require('electron')
import Chart from './Chart'

export default {
  name: 'home',
  data () {
    return {
      loading: false,
      reservations: null,
      center: { lat: 10.0, lng: 10.0 },
      markers: [],
      username: '',
      password: ''
    }
  },
  components: {
    Chart
  },
  mounted: function () {
    this.setIpcRenderers()
  },
  methods: {
    setIpcRenderers: function () {
      ipcRenderer.on('reply-authorize', (_event, response) => {
        ipcRenderer.send('get-reservations', 'ping')
      })

      ipcRenderer.on('reply-reservations', (_event, response) => {
        this.reservations = response.results
        this.markers = this.reservations.map(res => ({ position: { lat: res.lat, lng: res.lng } }))
        this.loading = false
      })
    },
    buttonAuthorizeClick: function () {
      if (!this.username || !this.password) return

      this.loading = true
      ipcRenderer.send('get-authorize', { username: this.username, password: this.password })
    }
  }
}
</script>
