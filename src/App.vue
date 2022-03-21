<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-2" dark>
      <v-toolbar-title> Meeting Scheduler </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="mx-2" outlined>
        <span class="mr-2">Register</span>
      </v-btn>
      <v-btn class="mx-2" to="/meeting/create">Schedule a meeting</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
};
</script>
