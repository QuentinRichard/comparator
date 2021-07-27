<template>
  <article>
    <p>Web Site url {{index}}:</p>
    <input
      type="text"
      class="form-control form-control-lg"
      v-model="websiteUrl"
      placeholder="Article Title"
    />
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class InputURL extends Vue {
  @Prop({ required: true }) index!: string;
  websiteUrl = '';

  @Watch('websiteUrl')
  websiteUrlChanged (val: string):void {
    this.$store.dispatch('updateUrl', { id: this.index, url: val })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  text-align: left;
}
</style>
