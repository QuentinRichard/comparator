<template>
  <article>
    <p>{{ Title }}</p>
    <div v-if='isDataLoadded'>
      <p>URL1 : {{getUrl(1)}}</p><br/><p>URL2 : {{getUrl(2)}}</p>
      <table class="table table-striped">
        <thead>
          <tr>
            <th class="table-data">#</th>
            <th class="table-data">Url 1</th>
            <th class="table-data">Url 2</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(CompKey,i) in getComparisonKeys" :key="i">
            <th scope="row">{{ CompKey  }}</th>
            <td :class="{isSelected : isSelectedUrl1(CompKey)}" class="table-data">{{ getValue(1, CompKey) }}</td>
            <td :class="{isSelected : isSelectedUrl2(CompKey)}" class="table-data">{{ getValue(2, CompKey) }}</td>
          </tr>
          <tr key="comment">
            <th scope="row">Comment</th>
            <td class="table-data"><span v-html="getUrlComment(1)"/></td>
            <td class="table-data"><span v-html="getUrlComment(2)"/></td>
          </tr>
        </tbody>
      </table>
      <br/>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ComparisonResult extends Vue {
  isSelectedUrl1 (key: string): boolean {
    const comparisonResult = this.$store.getters.ComparisonResultData
    if (comparisonResult && comparisonResult.summary && comparisonResult.summary.infoURL1) {
      return comparisonResult.summary.infoURL1.includes(key)
    } else return false
  }

  isSelectedUrl2 (key: string): boolean {
    const comparisonResult = this.$store.getters.ComparisonResultData
    if (comparisonResult && comparisonResult.summary && comparisonResult.summary.infoURL2) {
      return comparisonResult.summary.infoURL2.includes(key)
    } else return false
  }

  getValue (id:number, key: string): boolean {
    const comparisonResult = this.$store.getters.ComparisonResultData
    if (comparisonResult && comparisonResult.summary && comparisonResult.summary.infoURL2) {
      return comparisonResult.comparison[`url${id}`].info[key]
    } else return false
  }

  getUrlComment (id:number):string {
    const comparisonResult = this.$store.getters.ComparisonResultData
    if (comparisonResult && comparisonResult.comparison && comparisonResult.comparison[`url${id}`].comment) {
      return comparisonResult.comparison[`url${id}`].comment.join('<br/>')
    } else return ''
  }

  getUrl (id:number):string {
    const comparisonResult = this.$store.getters.ComparisonResultData
    if (comparisonResult && comparisonResult.comparison && comparisonResult.comparison[`url${id}`].origin) {
      return comparisonResult.comparison[`url${id}`].origin
    } else return ''
  }

  get getComparisonKeys ():string[] {
    const comparisonResult = this.$store.getters.ComparisonResultData
    if (comparisonResult && comparisonResult.comparison && comparisonResult.comparison.url1) {
      return Object.keys(comparisonResult.comparison.url1.info)
    } else return []
  }

  get Title ():string {
    const comparisonResult = this.$store.getters.ComparisonResultData
    if (!this.$store.getters.isDataLoadded) {
      return 'No result available'
    } else if (comparisonResult && comparisonResult.summary) {
      if (comparisonResult.summary.winner === 0) {
        return 'No Winner - ex æquo'
      } else return `The winner is Url${comparisonResult.summary.winner}`
    } else return 'No result available'
  }

  get isUrlsReady ():string {
    return this.$store.getters.isUrlsReady
  }

  get isDataLoadded ():string {
    return this.$store.getters.isDataLoadded
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-data{
  text-align: center;
}
p {
  text-align: left;
}
.isSelected {
  background-color: #9a90e7;
}
</style>
