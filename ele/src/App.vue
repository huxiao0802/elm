<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}

</script>

<style lang="scss">
    body,html,#app{
      width: 100%;
      height: 100%;
    }
    body,html,p{
      margin: 0%;
      padding: 0%;
      list-style: none;
      text-decoration: none;
    }
    #app{
      font-size: 0.32rem;
    }
</style>
