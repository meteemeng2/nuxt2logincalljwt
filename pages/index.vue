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


      <v-card>
        <v-card-title class="headline">
          Token
        </v-card-title>
        <v-card-text>
          <div>{{ localStoragetoken }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="resettoken">Reset Token</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import axios from 'axios';
import api_server2 from '../providers/apiprovider';

export default {
  name: "IndexPage",
  data() {
    return {
      url_login: "http://localhost:8014/api/Authentication/Login",
      url_randomnumber: "/Home/randomnumber",
      username: "",
      password: "",
      apiResponse: "",
      localStoragetoken: "",
    };
  },
  mounted() {
    this.localStoragetoken = localStorage.token;
  },
  computed: {
  },
  watch: {
    localStoragetoken(newValue) {
      localStorage.token = newValue; // Update localStorage when localStoragetoken changes
    },
  },
  methods: {
    async callApiWithJwtBearer() {
      try {
        const response = await api_server2.get(this.url_randomnumber);
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
        this.localStoragetoken = token;
        localStorage.token = token;
      } catch (error) {
        console.error(error); // Handle any error that occurred during the API call
        this.apiLoginResponse = error.response ? error.response.statusText : error.message;
      }
    },
    resettoken() {
      this.localStoragetoken = null; // Update localStoragetoken
    }
  },
};
</script>
