<template>
  <div class="page">
    <h1>Page</h1>
    <img :src="url">
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    chapter: String,
    pagenum: String
  },
  computed: {
      url() {
        return "/comic/" + this.chapter + "/" + this.pagenum + ".png"
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
