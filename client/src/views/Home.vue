<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Web Comparator</h1>
        <p>What is the difference between 2 websites.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-6">
          <section class="sidebar">
            <p>Paste the url of your websites:</p>
              <div
              v-if="!isLoading">
                <InputURL
                  :index=1
                />
                <br/>
                <InputURL
                  :index=2
                />
                <br/>
                <div v-if="isUrlsReady" class="buttonLeft">
                  <button @click="startComparison">Start the comparison</button>
                </div>
              </div>
              <div
              v-else>
              <p>Please wait ... (more or less 1 minutes, that depend on websites selected)</p>
              </div>
          </section>
        </div>
        <div class="col-md-6">
          <section class="sidebar">
            <p>Analysis result:</p>
            <div class="tag-list">
              <ComparisonResult></ComparisonResult>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import InputURL from '@/components/InputURL.vue'
import ComparisonResult from '@/components/ComparisonResult.vue'

@Component({
  components: {
    InputURL,
    ComparisonResult
  }
})
export default class Home extends Vue {
  startComparison ():void {
    this.$store.dispatch('startComparison')
  }

  get isUrlsReady ():string {
    return this.$store.getters.isUrlsReady
  }

  get isLoading ():string {
    return this.$store.getters.isLoading
  }
}
</script>

<style scoped>
.banner  {
    background: #6b5aed;
}
.buttonLeft {
  text-align: end;
}
.isDisplayed {
  display: none;
}
</style>
