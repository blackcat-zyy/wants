<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {

    },
    methods: {}
  }
</script>

<style>
  * {
    margin: 0;
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
  }

  #app {
    text-align: center;
    position: relative;
  }



</style>
