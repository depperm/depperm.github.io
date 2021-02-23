<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">Web TOTP</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <WebOTP/>
    </v-main>
  </v-app>
</template>

<script>
import WebOTP from './components/WebOTP';

export default {
  name: 'App',

  components: {
    WebOTP,
  },

  data: () => ({
    //
  }),
};
</script>
