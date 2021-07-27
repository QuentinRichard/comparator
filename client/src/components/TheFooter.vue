<template>
  <footer>
    <div class="container">
      <router-link class="logo-font" :to="{ name: 'Home', params: {} }">
        <p class="title">Web Comparator</p>
      </router-link>
      <span class="attribution">
        Projet Test &amp; Design licensed under MIT.
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'RwvFooter'
}
</script>

<style scoped>
.title  {
    color: #6b5aed;
}
</style>
