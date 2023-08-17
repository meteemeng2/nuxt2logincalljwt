<template>
  <div class="login-container">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" v-if="!token">
        <v-card>
          <v-card-title class="headline">
            Login
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="username" label="Username"></v-text-field>
            <v-text-field v-model="password" label="Password" type="password"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="login">Login</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="6" v-if="token">
        <v-card-actions>
          <!-- Add buttons for different sites -->
          <v-btn color="primary" @click="redirectToSite('react')">Redirect to React Site</v-btn>
          <v-spacer />
          <v-btn color="primary" @click="redirectToSite('angular')">Redirect to Angular Site</v-btn>
          <!-- Add more buttons for other sites if needed -->
        </v-card-actions>
      </v-col>
    </v-row>
  </div>
</template>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensures the container takes at least the full viewport height */
}
</style>

<script>
import axios from 'axios';

export default {
  name: "IndexPage",
  data() {
    return {
      username: "",
      password: "",
      token: "",
    };
  },
  methods: {
    async login() {
      try {
        const data = {
          username: this.username,
          password: this.password,
        };
        const response = await axios.post(this.$config.IdentityURL, data);
        this.token = response.data.token; // Use "this.token" to set the token
      } catch (error) {
        console.error(error);
      }
    },
    redirectToSite(site) {
      if (this.token) { // Use "this.token" to check if the token exists
        let redirect_url = '';
        if (site === 'react') {
          redirect_url = `${this.$config.ReactClientURL}?jwt=${this.token}`; // Use "this.token"
        } else if (site === 'angular') {
          redirect_url = `${this.$config.AngularClientURL}?jwt=${this.token}`; // Use "this.token"
        }
        window.location.href = redirect_url;
      }
    },
  },
};
</script>
