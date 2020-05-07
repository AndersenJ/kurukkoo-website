<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Page chapter="00" pagenum="000"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Page from '@/components/Page.vue'

export default {
  name: 'Home',
  components: {
    Page
  }
}
</script>
