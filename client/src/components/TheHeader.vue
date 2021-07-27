<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand " :to="{ name: 'Home' }">
        <p class="title">Web Comparator</p>
      </router-link>
      <ul v-if="true" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'Home' }"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'About' }"
          >
            About
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'RwvHeader',
  computed: {}
}
</script>

<style scoped>
.title  {
    color: #6b5aed;
}
</style>
