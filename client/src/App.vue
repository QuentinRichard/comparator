<template>
  <div id="app">
    <RwvHeader />
    <router-view/>
    <RwvFooter />
  </div>
</template>

<script>
import RwvHeader from '@/components/TheHeader'
import RwvFooter from '@/components/TheFooter'

export default {
  name: 'App',
  components: {
    RwvHeader,
    RwvFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
