<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Login
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="username" label="Username"></v-text-field>
          <v-text-field v-model="password" label="Password" type="password"></v-text-field>
        </v-card-text>
        <v-card-title class="headline">
          API Login Response
        </v-card-title>
        <v-card-text>
          <div>{{ url_login }}</div>
        </v-card-text>
        <v-card-text>
          <div>{{ apiLoginResponse }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>

      <v-card>
        <v-card-title class="headline">
          API Response
        </v-card-title>
        <v-card-text>
          <div>{{ url_randomnumber }}</div>
        </v-card-text>
        <v-card-text>
          <div>{{ apiResponse }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="callApiWithJwtBearer">Call API</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
import api from '../providers/apiprovider';

export default {
  name: "IndexPage",
  data() {
    return {
      url_login: "http://localhost:8014/api/Authentication/Login",
      url_randomnumber: "http://localhost:8011/api/Home/randomnumber",
      username: "",
      password: "",
      apiLoginResponse: "",
      apiResponse: ""
    };
  },
  mounted() {
    // this.login().then(() => {
    //   this.callApiWithJwtBearer();
    // });
  },
  computed: {
    ...mapState(['token']), // Include the token in the computed properties
    // Rest of your computed properties
  },
  methods: {
    ...mapActions(['saveToken']), // Include the saveToken action
    async callApiWithJwtBearer() {
      try {
        const token = this.token; // Get the token from the store

        const response = await axios.get(this.url_randomnumber, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.apiResponse = response.data;
      } catch (error) {
        console.error(error); // Handle any error that occurred during the API call
        this.apiResponse = error.response ? error.response.statusText : error.message;
      }
    },
    async login() {
      try {
        const data = {
          username: this.username,
          password: this.password,
        };
        const response = await axios.post(this.url_login, data);
        const token = response.data.token;
        this.saveToken(token); // Save token to the store
        this.apiLoginResponse = token;
      } catch (error) {
        console.error(error); // Handle any error that occurred during the API call
        this.apiLoginResponse = error.response ? error.response.statusText : error.message;
      }
    }
  },
};
</script>
