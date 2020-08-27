<template>
  <div class="banner row">
      <div class="banner-left col-8">
          <h2>Buku Terbaik 2020<br>{{ `${data.name} by ${data.author}` }}</h2>
          <v-btn color="primary" large depressed :to="`/product/${data.seo_url}`">Lihat Buku</v-btn>
      </div>
      <div class="banner-right col-4">
          <v-img :src="$store.state.url + data.image" />
      </div>
  </div>
</template>

<script>
export default {
    name: 'Banner',
    props: {
        data: Object
    }
}
</script>

<style>

</style>